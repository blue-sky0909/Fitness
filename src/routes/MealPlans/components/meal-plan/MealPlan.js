import { Pie } from 'react-chartjs-2'
import { FaPlus } from 'react-icons/lib/fa'
import MealItem from './MealItem'
import crossfilter from 'crossfilter'
import ModalFood from './ModalFood'
import MealMacros from './MealMacros'
import LoadingIndicator from 'components/LoadingIndicator'
import MealPlanCreate from './MealPlanCreate'
import './MealPlan.scss'

const ReactToastr = require("react-toastr");
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

export default class MealPlan extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      mealPlanId: PropTypes.string
    }),
    mealPlanGet: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      data: PropTypes.object,
      error: PropTypes.any
    }),
    userGet: PropTypes.object.isRequired,
    userGetRequest: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      mealDayId: null,
      mealPlanTitle: "",
      isOpen: false,
      mealIds: [],
      mealPlans: [],
      isVisibleMeals: [],
      isChecked: 0,
      flag: [],
      pageNum: 1,
      error: false,
      totalProtein: 0,
      totalFat: 0,
      totalCarbs: 0,
      totalCal: 0,
      userRemainingProtein: 0,
      userRemainingCalories: 0,
      userRemainingCarbs: 0,
      userRemainingFats: 0
    }

    this.setMealPlanTitle = this.setMealPlanTitle.bind(this)
    this.setMealFood = this.setMealFood.bind(this)
    this.removeMealPlan = this.removeMealPlan.bind(this)
    this.createMealFoodPlan = this.createMealFoodPlan.bind(this)
    this.updateMealPlanTitle = this.updateMealPlanTitle.bind(this)
    this.searchFoods = this.searchFoods.bind(this)
    this.getMoreFoods = this.getMoreFoods.bind(this)
    this.setMealFoodQuantity = this.setMealFoodQuantity.bind(this)
    this.checkError = this.checkError.bind(this)
    this.calCulatorValue = this.calCulatorValue.bind(this)
    this.calculatorRemainingMacros = this.calculatorRemainingMacros.bind(this)
  }

  componentWillMount() {
    const { params: { mealPlanId }, getMealPlan } = this.props
    this.props.foodsAllGet(this.state.pageNum) 
    if (mealPlanId) {
      getMealPlan(mealPlanId)
    } else {
      this.props.createMealPlan()
    }
  }
  
  componentDidUpdate(props, state) {
    if(this.props.mealPlanGet.loaded === true && state.mealDayId == null) {
      let { mealPlans, isVisibleMeals, mealIds, isChecked, flag } = this.state
      this.setState({mealDayId: this.props.mealPlanGet.getMealDayInfo.data[0].id})
      if(!_.isNil(this.props.mealPlanGet.getMealDayInfo.included[0].attributes.title))
        this.setState({mealPlanTitle: this.props.mealPlanGet.getMealDayInfo.included[0].attributes.title})
      mealIds = _.filter(this.props.mealPlanGet.mealIds.included, function(item) {
        return item.type == 'meals'
      })
      
      if(mealPlans.length == 0) {
        mealIds.map((value, index) => {
          mealPlans.push([])
          isVisibleMeals.push(index == 0)
        })
      }
      mealPlans[isChecked] = this.getFoodsByMealId(this.props.mealPlanGet.mealFoods)
      flag.push(isChecked)
      this.setState({ mealPlans, isVisibleMeals, mealIds, flag })
      this.calCulatorValue(-1, -1, isChecked)
    }
  }

  getFoodsByMealId(arr) {
    const mealFoods = _.filter(arr.included, function(item){
      return item.type == 'foods'
    });
    let updatedMealFoods = []  
    const data = arr.data    
    mealFoods.forEach(function(item, index) {
      let temp = {}
      temp.id = item.id
      temp.type = item.type
      temp.carbs = item.attributes.carbs
      temp.fat = item.attributes.fat
      temp['most-used-serving'] = item.attributes['most-used-serving']
      temp['most-used-serving-text'] = item.attributes['most-used-serving-text']
      temp.name = item.attributes.name
      temp.protein = item.attributes.protein
      temp['serving-unit'] = item.attributes['serving-unit']
      temp['unit-serving'] = item.attributes['unit-serving']
      temp['unit-volume'] = item.attributes['unit-volume']
      temp.mealFoodId = data[index].id      
      temp.quantity = data[index]['attributes'].quantity
      temp.measurement = arr.data[index].attributes.measurement
      updatedMealFoods.push(temp)
    })
    return updatedMealFoods
  }

  createMealFoodPlan(item) {
    const mealPlanId = this.props.params.mealPlanId
    this.props.createMealFood(item)
    .then((res) => {
      item.mealFoodId = res.data.id
      this.refs.message.success(
      "",
      "Successfully added food to meal", {
        timeOut: 2000,
        extendedTimeOut: 2000
      });
      let { isChecked, mealPlans } = this.state
      mealPlans[isChecked].push(item)
      this.setState({ mealPlans })
      this.calCulatorValue(-1, -1, isChecked)
      this.props.mealPlanMacrosGet(mealPlanId)
    })
  }
  
  // show and hide modal
  toggleModal = (val) => {
    if(!isNaN(val)) this.setState({ isChecked: val })
    this.setState({ isOpen: !this.state.isOpen });  
    this.setState({ pageNum: 1 })
    this.props.foodsAllGet(1)
  }

  // set title of meal plan
  setMealPlanTitle(e) {
    this.setState({mealPlanTitle: e.target.value})
  }

  // set tile of meal
  setMealItemTitle (field, val) {
    this.props.saveMealTitle(this.state.mealIds[field].id, val.target.value, field)
  }

  // add food in meal
  setMealFood(item) {
    let { isChecked, mealPlans } = this.state
    const sameRow = _.find(mealPlans[isChecked], (element) => {
      return element.id == item.id
    })
    if(_.isNil(sameRow)){
      item.dayId = this.state.mealIds[isChecked].attributes.day
      item.mealId = this.state.mealIds[isChecked].id
      this.createMealFoodPlan(item)
    }
  }

  // select meal type
  selectMeal = (index) => {
    let { isChecked, isVisibleMeals, mealPlans, flag } = this.state
    isChecked = index
    isVisibleMeals[index] = 1
    this.setState({ isChecked, isVisibleMeals})    

    if (flag.indexOf(index) == -1) {
      this.props.getMealFoods(this.state.mealIds[index].id)
      .then((res)=>{
        mealPlans[index] = this.getFoodsByMealId(res)
        this.setState({ mealPlans })
        this.calCulatorValue(-1, -1, index)    
      })
    }
    flag.push(index)
    this.setState({ flag })   
  }
  
  // remove food in meal
  removeMealPlan (index, row){
    const mealPlanId = this.props.params.mealPlanId
    let { isChecked, mealPlans } = this.state
    this.props.removeMealFood(row.mealFoodId)
    .then((res) => {
      if(res == true) {
        _.remove(mealPlans[index], function(item) {
          return item.id === row.id;
        });
        this.setState({ mealPlans})
        this.calCulatorValue(-1, -1, index)
        this.refs.message.success(
          "",
          "Successfully deleted food to meal", {
            timeOut: 2000,
            extendedTimeOut: 2000
          }); 
      }
      this.props.mealPlanMacrosGet(mealPlanId)
    })
  }

  searchFoods(name) {
    if(name !="")
      this.props.searchFoods(name)
    else {
      this.props.foodsAllGet(1)
      this.setState({pageNum: 1})
    }      
  }

  updateMealPlanTitle() {
    const mealPlanId = this.props.params.mealPlanId
    this.props.saveMealPlanTitle(mealPlanId, this.state.mealPlanTitle)
    .then((res)=> {
      if(res == true) {
        this.refs.message.success(
          "",
          "This meal plan has been saved", {
            timeOut: 2000,
            extendedTimeOut: 2000
          }); 
      }
    })
  }

  // get more foods
  getMoreFoods() {
    let {pageNum} = this.state
    pageNum = pageNum + 1
    this.props.foodsAllGet((pageNum))
    this.setState({ pageNum })
  }

  //save quantity
  setMealFoodQuantity(mealFood, quantity, index) {
    const mealPlanId = this.props.params.mealPlanId
    this.props.mealPlanMacrosGet(mealPlanId)
    this.props.mealFoodQuantity(mealFood.mealFoodId, quantity)
    this.calCulatorValue(mealFood.mealFoodId, quantity, index)
  }

  checkError(val) {
    this.setState({error: val})
  }

  calCulatorValue(id, quantity, index) {
    const {mealPlans} = this.state
    const mealPlanId = this.props.params.mealPlanId
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalCal = 0;

    if(mealPlans[index].length > 0) {
      mealPlans[index].forEach(function(element) {
        if(id == parseInt(element.mealFoodId)) {            
          totalProtein += parseFloat(element.protein * quantity/element['most-used-serving'])
          totalFat += parseFloat(element.fat *  quantity/element['most-used-serving'])
          totalCarbs += parseFloat(element.carbs *  quantity/element['most-used-serving'])
          element.quantity = quantity     
        } else {
          if(element.quantity) {
            totalProtein += parseFloat(element.protein * element.quantity/element['most-used-serving'])
            totalFat += parseFloat(element.fat * element.quantity/element['most-used-serving'])
            totalCarbs += parseFloat(element.carbs * element.quantity/element['most-used-serving'])
          } else {   
            totalProtein += parseFloat(element.protein)
            totalFat += parseFloat(element.fat)
            totalCarbs += parseFloat(element.carbs)
          }
        }
      });
      totalCal = totalCarbs * 4 + totalFat * 9 + totalProtein * 4
    }

    mealPlans[index].totalProtein = totalProtein
    mealPlans[index].totalFat = totalFat
    mealPlans[index].totalCarbs = totalCarbs
    mealPlans[index].totalCal = totalCal
    this.setState({ mealPlans })
    let allValue = {}
    allValue.totalProtein = totalProtein
    allValue.totalFat = totalFat
    allValue.totalCarbs = totalCarbs
    allValue.totalCal = totalCal
    this.props.saveCalculator(allValue, index, mealPlanId)
    this.calculatorRemainingMacros()
  }

  calculatorRemainingMacros() {
    const { userGet, mealMarco } = this.props
    const userProtein = userGet.data.data.attributes.protein
    const userFats = userGet.data.data.attributes.fats
    const userCarbs = userGet.data.data.attributes.carbs
    const userCalories = userGet.data.data.attributes.calories

    const allValue = mealMarco.data
    let protein = 0
    let calories = 0
    let carbs = 0
    let fat = 0
    allValue.forEach(function(element) {
      if(!_.isEmpty(element)) {
        protein += parseFloat(element.totalProtein)
        calories += parseFloat(element.totalCal)
        carbs += parseFloat(element.totalCarbs)
        fat += parseFloat(element.totalFat)
      }
    });

    this.setState({userRemainingProtein: userProtein - protein})
    this.setState({userRemainingFats: userFats - fat})
    this.setState({userRemainingCarbs: userCarbs - carbs})
    this.setState({userRemainingCalories: userCalories - calories})
  }

  render() {
    const { foodsGet, mealPlanGet, userGet, mealMarco } = this.props
    const { 
      mealIds,
      isVisibleMeals,
      mealPlans,
      isChecked,
      userRemainingProtein,
      userRemainingFats,
      userRemainingCarbs,
      userRemainingCalories
    } = this.state
    
    if(_.isNil(this.props.params.mealPlanId)) {
      return <MealPlanCreate/>
    } else {
      if(mealIds.length > 0){
        return (
          <div className="container">
            <ModalFood show={this.state.isOpen}
              onClose={this.toggleModal}
              allFoods={foodsGet.data.formattedData}
              setMealFood={this.setMealFood}
              searchFoods={this.searchFoods}
              getMoreFoods={this.getMoreFoods}
              checkError={this.checkError}>     
            </ModalFood>
            {
              this.state.isOpen && <div className="overlay-section"></div>
            }
            
            <section className="meal-create">
              <div className="row">
                <div className="col-sm-12 col-md-3">
                  <label className="meal-plan-title-label">Title</label>
                  <input type="text" className="form-control meal-plan-title" placeholder="Please insert title to add meal plan"
                  name="mealPlan" value={this.state.mealPlanTitle} onChange={this.setMealPlanTitle}/>
                </div>
                <MealMacros 
                  userRemainingProtein={userRemainingProtein}
                  userRemainingFats={userRemainingFats}
                  userRemainingCarbs={userRemainingCarbs}
                  userRemainingCalories={userRemainingCalories} />
              </div> 
              {
                mealIds.map((val, index) =>
                  <div key={index} className="form-group">
                    <div className="input-wrapper pad">
                      <label className="red-input-holder">
                        <input name="gender" type="radio" value="1" checked={ isChecked == index } onChange={() => this.selectMeal(index)}/>
                        <div className="input-ui">
                          <div className="select-item">
                            <span className="radio-button-outer">
                              <span className="radio-button-inner">
                                &nbsp;
                              </span>
                            </span>
                            <input className="label" type="text" 
                              name={index}
                              defaultValue={val.attributes.name}
                              onChange={this.setMealItemTitle.bind(this, index)}
                            />
                          </div>  
                          {
                            isVisibleMeals[index] ?
                              <button className="btn btn-danger" onClick={() => this.toggleModal(index)}><FaPlus/> ADD FOOD</button> 
                            : null
                          }
                        </div>                     
                      </label>              
                    </div>          
                     {
                      isVisibleMeals[index] ?
                        <MealItem 
                          mealPlans={mealPlans[index]}
                          removeMealPlan={this.removeMealPlan}
                          setMealFoodQuantity={this.setMealFoodQuantity}
                          index={index}
                          checkError={this.checkError}/>
                      : null
                    }
                  </div>
                )
              }
              <button className="btn btn-danger" style={btnStyle} onClick={this.updateMealPlanTitle} disabled={this.state.error} >Save</button>      
            </section>
            <ToastContainer ref="message"
              toastMessageFactory={ToastMessageFactory}
              className="toast-top-right" />
          </div>
        )
      } else {
        return (
          <div style={spinnerStyle}>
            <LoadingIndicator type="spinner"/>
          </div>
        )
      }    
    }   
  }
}

const btnStyle = {
  float: 'right',
  width: 150,
  height: 50,
  fontSize: 24,
  background: '#ed1c24',
  borderColor: '#ed1c24'
}

const spinnerStyle = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center'
}