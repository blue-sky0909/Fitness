import { FaTrashO } from 'react-icons/lib/fa'
import { connect } from 'react-redux'

export default class MealItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isAddFoodOpen: false,
      quantity: 1,
      updatedRow: -1,
      updatedQuantity: -1,
      error: false
    }
  }

  setItem = (field, value) => {
    const {index} = this.props
    this.setState({[field.id]: value.target.value})
    if((parseFloat(value.target.value) > parseFloat(0)) && !isNaN(value.target.value)) {   
      this.props.setMealFoodQuantity(field, value.target.value, index)
      this.setState({updatedRow: field.mealFoodId})
      this.setState({updatedQuantity: value.target.value})
      this.props.checkError(false)
    } else {
      this.props.checkError(true)
    }
  }

  removeRow(val) {
    this.props.removeMealPlan(this.props.index, val)
  }

  render() {
    const { mealPlans, index } = this.props
    const { error } = this.state

    return(
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="name">NAME</th>
              <th className="custom-cell">UNIT SERVING</th>
              <th className="custom-cell">PROTEIN</th>
              <th className="custom-cell">FAT</th>
              <th className="custom-cell">CARBS</th>
              <th className="custom-cell">CAL</th>
              <th className="custom-cell">REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {
              mealPlans.map((val, index) =>
                <tr key={index}>
                  <td>{val.name}</td>
                  <td className="custom-cell">
                    <div className="insert-detail">
                      <input 
                        type="text"
                        className="form-control"
                        name={val.id}                       
                        defaultValue={val.quantity ? parseFloat(val.quantity).toFixed(2) : val['most-used-serving']}
                        onChange={this.setItem.bind(this, val)}/>
                      <span>{val['unit-volume']}</span>
                    </div>
                    {                      
                      (parseFloat(this.state[val.id]) <= 0 || (this.state[val.id] && isNaN(this.state[val.id])) || this.state[val.id] == "") ?
                        <div style={errorStyle}>You can insert only positive numbers</div>
                      : null
                    }                     
                               
                  </td>
                  <td className="custom-cell">
                    {
                      (parseFloat(this.state[val.id]) > 0 && (this.state[val.id] && !isNaN(this.state[val.id])))  ? 
                        (val.protein/val['most-used-serving'] * this.state[val.id]).toFixed(2)
                      : val.quantity ? (val.protein * val.quantity / val['most-used-serving']).toFixed(2)
                        : val.protein
                    }
                  </td>
                  <td className="custom-cell">
                    {
                      (parseFloat(this.state[val.id]) > 0 && (this.state[val.id] && !isNaN(this.state[val.id]))) ? 
                        (val.fat/val['most-used-serving'] * this.state[val.id]).toFixed(2)
                      : val.quantity ? (val.fat * val.quantity/val['most-used-serving']).toFixed(2)
                        : val.fat
                    }
                  </td>
                  <td className="custom-cell">
                    {
                      (parseFloat(this.state[val.id]) > 0 && (this.state[val.id] && !isNaN(this.state[val.id]))) ? 
                        (val.carbs/val['most-used-serving'] * this.state[val.id]).toFixed(2)
                      : val.quantity ? (val.carbs * val.quantity / val['most-used-serving']).toFixed(2)
                        : val.carbs
                    }
                  </td>
                  <td className="custom-cell">
                    {
                     (parseFloat(this.state[val.id]) > 0 && (this.state[val.id] && !isNaN(this.state[val.id]))) ? 
                        (val.carbs * 4/val['most-used-serving'] * this.state[val.id] + val.fat * 9/val['most-used-serving'] * this.state[val.id] + val.protein * 4/val['most-used-serving'] * this.state[val.id]).toFixed(2)
                      : val.quantity? ((parseFloat(val.carbs * 4) + parseFloat(val.protein * 4) + parseFloat(val.fat * 9)) * val.quantity/val['most-used-serving']).toFixed(2)
                        : (parseFloat(val.carbs * 4) + parseFloat(val.protein * 4) + parseFloat(val.fat * 9)).toFixed(2)
                    }
                  </td>
                  <td className="custom-cell"><span className="removeBtn"><FaTrashO onClick={this.removeRow.bind(this, val)}/></span></td>
                </tr>
              )
            }
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td>
                {
                  mealPlans.totalProtein ? (mealPlans.totalProtein).toFixed(2)
                  : 0.00
                }
              </td>
              <td>
                {
                  mealPlans.totalFat ? (mealPlans.totalFat).toFixed(2)
                  : 0.00
                }
              </td>
              <td>
                {
                  mealPlans.totalCarbs ? (mealPlans.totalCarbs).toFixed(2)
                  : 0.00
                }
              </td>
              <td>
                {
                  mealPlans.totalCal ? (mealPlans.totalCal).toFixed(2)
                : 0.00
                }
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

const errorStyle = {
  color: 'red',
  fontSize: 12
}