import { Pie } from 'react-chartjs-2'
import { FaPlus } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import MealItem from './MealItem'
import crossfilter from 'crossfilter'
import ModalFood from './ModalFood'
import LoadingIndicator from 'components/LoadingIndicator'
import MealPlan from '../../components/meal-plan/MealPlan'
import { mealPlanCreate} from '../../routes/EditMealPlan/reducers/mealPlanCreate'
import { createMealFood, removeMealFood, mealFoodQuantity} from '../../routes/EditMealPlan/reducers/mealFoods'
import { saveMealTitle, saveMealPlanTitle } from '../../routes/EditMealPlan/reducers/mealTitleUpdate'
import { foodsAllGet, searchFoods } from '../../routes/EditMealPlan/reducers/foodsGet'
import { saveCalculator } from '../../routes/EditMealPlan/reducers/mealMarcoSet'
import { mealPlanMacrosGet } from '../../routes/EditMealPlan/reducers/mealPlanMacrosGet'
import MealMacros from './MealMacros'
import './MealPlan.scss'

const ReactToastr = require("react-toastr");
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class MealPlanCreate extends React.Component {
  static propTypes = {
    mealPlanCreate: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      mealPlanId: PropTypes.object,
      getMealDayInfo: PropTypes.object,
      mealIds: PropTypes.object
    }),
    createMealPlan: PropTypes.func,
    userGet: PropTypes.object.isRequired,
    userGetRequest: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      mealPlanTitle: "",
      isOpen: false,
      mealIds: [],
      mealPlans: [],
      isVisibleMeals: [],
      isChecked: 0,
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
  
  }

  componentDidUpdate(props, state) {
    if(this.props.mealPlanCreate.loaded === true && state.mealIds.length == 0) {
      const { mealPlanCreate } = this.props
      if(this.props.mealPlanCreate.mealIds) {
        const mealIds = _.filter(this.props.mealPlanCreate.mealIds.included, function(item) {
          return item.type == 'meals'
        })
        
        let mealPlans = [], isVisibleMeals = [];
        mealIds.map((value, index) => {
          mealPlans.push([])
          isVisibleMeals.push(index == 0)
        })
        this.setState({ mealIds, mealPlans, isVisibleMeals })
      //  this.calCulatorValue(-1, -1, 0)
      }
    }
  }

  createMealFoodPlan(item) {
    const mealPlanId = this.props.mealPlanCreate.mealPlanId.data.id 
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
    this.setState({
      isOpen: !this.state.isOpen
    });
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
    let { isChecked, isVisibleMeals } = this.state
    isChecked = index
    isVisibleMeals[index] = 1
    this.setState({ isChecked, isVisibleMeals })
    this.calCulatorValue(-1, -1, index) 
  }
  
  // remove food in meal
  removeMealPlan (index, row){
    const mealPlanId = this.props.mealPlanCreate.mealPlanId.data.id
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

  updateMealPlanTitle() {
    const mealPlanId = this.props.mealPlanCreate.mealPlanId.data.id
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

  searchFoods(name) {
    if(name !="")
      this.props.searchFoods(name)
    else {
      this.props.foodsAllGet(1)
      this.setState({pageNum: 1})
    }  
  }

  getMoreFoods() {
    let {pageNum} = this.state
    pageNum = pageNum + 1
    this.props.foodsAllGet((pageNum))
    this.setState({ pageNum })
  }

  //save quantity
  setMealFoodQuantity(mealFood, quantity, index) {
    const mealPlanId = this.props.mealPlanCreate.mealPlanId.data.id
    this.props.mealPlanMacrosGet(mealPlanId)
    this.props.mealFoodQuantity(mealFood.mealFoodId, quantity)
    this.calCulatorValue(mealFood.mealFoodId, quantity, index)
  }

  checkError(val) {
    this.setState({error: val})
  }

  calCulatorValue(id, quantity, index) {
    const { mealPlans } = this.state
    const { mealPlanCreate } = this.props
    const mealPlanId = mealPlanCreate.mealPlanId.data.id
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalCal = 0;

    if(mealPlans[index] && mealPlans[index].length > 0) {
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
    const { mealPlanCreate, foodsGet, mealPlanGet, userGet, mealMarco } = this.props
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

    if(mealPlanCreate.loaded && mealIds.length > 0) {
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
                            value={this.state.index}
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
            <button className="btn btn-danger" style={btnStyle} onClick={this.updateMealPlanTitle}>Save</button>      
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

const btnStyle = {
  float: 'right',
  width: 150,
  height: 50,
  fontSize: 24
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

const mapStateToProps = state => ({
  mealPlanGet: state.mealPlanGet,
  mealPlanCreate: state.mealPlanCreate,
  foodsGet: state.foodsGet,
  userGet: state.userGet,
  mealTitle: state.mealTitle,
  mealMarco: state.mealMarco
})

const mapDispatchToProps = dispatch => ({
  userGetRequest: () => dispatch(userGetRequest()),
  createMealPlan: () => dispatch(mealPlanCreate()),
  createMealFood: (mealPlans) =>dispatch(createMealFood(mealPlans)),
  removeMealFood: (mealFoodId) => dispatch(removeMealFood(mealFoodId)),
  saveMealTitle: (id, title, sort) => dispatch(saveMealTitle(id, title, sort)),
  saveMealPlanTitle: (id, title) => dispatch(saveMealPlanTitle(id, title)),
  foodsAllGet: (pageNum) => dispatch(foodsAllGet(pageNum)),
  searchFoods: (name) => dispatch(searchFoods(name)),
  mealFoodQuantity: (id, quantity) =>dispatch(mealFoodQuantity(id, quantity)),
  saveCalculator: (val, index, id) => dispatch(saveCalculator(val, index, id)),
  mealPlanMacrosGet: (mealPlanId) => dispatch(mealPlanMacrosGet(mealPlanId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MealPlanCreate)