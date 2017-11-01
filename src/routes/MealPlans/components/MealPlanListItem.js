import { Link } from 'react-router'
import { editMealPlanUrl } from 'routes/urlGenerators'

export default class MealPlanListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemRemove: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.onDeleteItem = this.onDeleteItem.bind(this)
  }

  onDeleteItem() {
    const { item, onItemRemove } = this.props
    onItemRemove(item.id)
  }

  render() {
    const { item } = this.props
    return (
      <tr key={item.id}>
        <td>
          <Link to={editMealPlanUrl(item.id)} className="title">
            { item.title }
          </Link>
        </td>
        <td>{ item.protein }</td>
        <td>{ item.fat }</td>
        <td>{ item.carbs }</td>
        <td>{ (item.protein * 4 + item.carbs * 4 + item.fat * 9).toFixed(2) }</td>
        <td>{ moment(item['created-at']).format('MM/DD/YY') }</td>
        <td>
          <div className='mealplan-item-actions'>
            <button onClick={this.onDeleteItem}>
              <i className='btb bt-trash' aria-hidden='true' />
            </button>
            <Link to={editMealPlanUrl(item.id)}>
              <button>
                <i className='btb bt-pencil' aria-hidden='true' />
              </button>
            </Link>
          </div>
        </td>
      </tr>
    )
  }
}