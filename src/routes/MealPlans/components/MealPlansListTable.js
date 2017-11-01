import MealPlanListItem from './MealPlanListItem'

export default class MealPlansListTable extends React.Component {
  static propTypes = {
    mealPlans: PropTypes.array.isRequired,
    onDeleteItem: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  handleItemDelete(itemId) {
    this.props.onDeleteItem(itemId)
  }

  renderRows() {
    const { mealPlans } = this.props   
    return mealPlans.map(mealPlan => (
      <MealPlanListItem
        key={mealPlan.id}
        item={mealPlan}
        onItemRemove={this.handleItemDelete} />
    ))
  }

  render() {
    const { mealPlans, onDeleteItem, ...other } = this.props

    return (
      <table className='mealplans-list-table' {...other}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Protein</th>            
            <th>Fats</th>
            <th>Carbs</th>
            <th>Calories</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { this.renderRows() }
        </tbody>
      </table>
    )
  }
}