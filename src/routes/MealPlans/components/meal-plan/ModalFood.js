import { FaClose, FaPlus } from 'react-icons/lib/fa'
import InfiniteScroll from 'react-infinite-scroller'

class ModalFood extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isAddFoodOpen: false,
      hasMore: true,
      searchKey: "",
      error: false
    }    
  }

  setItem = (field, value) => {
    this.setState({[field]: value.target.value})
    if((parseFloat(value.target.value) > parseFloat(0)) && !isNaN(value.target.value)) {
      this.setState({error: false})
    } else {
      this.setState({error: true})
    }
  }

  addRow = (val) => {
    if(this.state.error == false) {
      if(this.state[val.id]) {
        val.protein = (val.protein/val['most-used-serving'] * this.state[val.id]).toFixed(2)
        val.fat = (val.fat/val['most-used-serving'] * this.state[val.id]).toFixed(2)
        val.carbs = (val.carbs/val['most-used-serving'] * this.state[val.id]).toFixed(2)
        val['most-used-serving'] = this.state[val.id]
      }    
      this.props.setMealFood(val)
    }
  }

  getMoreFoods() {
    if(this.state.hasMore == true) {
      this.props.getMoreFoods()
    }      
  }
  searchFoods(e) {
    this.setState({searchKey : e.target.value})
    this.props.searchFoods(e.target.value)
     
    if(e.target.value != "") {
      this.setState({hasMore: false})     
    } else {
      this.setState({hasMore: true})
    }
  }

  renderRow() {
    const {allFoods} = this.props
    return(
      <div className="table-responsive" style={{height: 250}}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>NAME</th>
              <th className="custom-cell">UNIT SERVING</th>
              <th className="custom-cell">PROTEIN</th>
              <th className="custom-cell">FAT</th>
              <th className="custom-cell">CARBS</th>
              <th className="custom-cell">CAL</th>
              <th className="custom-cell">ADD</th>
            </tr>
          </thead>
          <tbody>
            {
              allFoods.map((val, ind) =>
                <tr key={ind}>
                  <td>{val.name}</td>
                  <td className="custom-cell">
                    <div className="insert-detail">
                      <input 
                        type="text"
                        className="form-control"
                        name={val.id}
                        defaultValue={val['most-used-serving']}
                        onChange={this.setItem.bind(this, val.id)}/>
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
                     (parseFloat(this.state[val.id]) > 0 && (this.state[val.id] && !isNaN(this.state[val.id]))) ? 
                        (val.protein/val['most-used-serving'] * this.state[val.id]).toFixed(2)
                      : val.protein
                    }
                  </td>
                  <td className="custom-cell">
                    {
                      (parseFloat(this.state[val.id]) > 0 && (this.state[val.id] && !isNaN(this.state[val.id]))) ? 
                        (val.fat/val['most-used-serving'] * this.state[val.id]).toFixed(2)
                      : val.fat
                    }
                  </td>
                  <td className="custom-cell">
                    {
                      (parseFloat(this.state[val.id]) > 0 && (this.state[val.id] && !isNaN(this.state[val.id]))) ? 
                        (val.carbs/val['most-used-serving'] * this.state[val.id]).toFixed(2)
                      : val.carbs
                    }
                  </td>
                  <td className="custom-cell">
                    {
                      (parseFloat(this.state[val.id]) > 0 && (this.state[val.id] && !isNaN(this.state[val.id]))) ? 
                        (val.carbs * 4/val['most-used-serving'] * this.state[val.id] + val.fat * 9/val['most-used-serving'] * this.state[val.id] + val.protein * 4/val['most-used-serving'] * this.state[val.id]).toFixed(2)
                      : (parseFloat(val.carbs * 4) + parseFloat(val.protein * 4) + parseFloat(val.fat * 9)).toFixed(2)
                    }
                  </td>
                  <td className="custom-cell btn-add"><FaPlus onClick={this.addRow.bind(this, val)}/></td>
                </tr>
              )
            }
          </tbody>                  
        </table>
      </div>
    )
  }
  render() {  
    const {allFoods} = this.props
    if(!this.props.show) {
      return null;
    }
      return(
        <div className="backdrop meal-create">
          <div className="modal" style={modalStyle}>
            <FaClose onClick={this.props.onClose} style={closeBtn} />
            <div className="food-search-form">
              <label>Search For Foods</label>
              <input type="text" className="form-control" placeholder="Start typing to search"
                name="searchKey" value={this.state.searchKey} onChange={this.searchFoods.bind(this)}/>              
            </div>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.getMoreFoods.bind(this)}
              hasMore={this.state.hasMore}
              loader={<div className="loader"></div>}
              initialLoad={false}
            >
              {this.renderRow()}
            </InfiniteScroll>
          </div>
        </div>
      )   
  }
}

ModalFood.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
 // children: PropTypes.node
};

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: 5,
  maxWidth: 1000,
  minHeight: 400,
  height: 500,
  margin: '0 auto',
  padding: 30,
  display: 'block',
  marginTop: 150,
  zIndex: 99999
};

const footerStyle = {
  position: 'absolute',
  bottom: 20,
  right: 0
}

const btnStyle = {
  width: 120,
  minHeight: 40,
  marginRight: 30
}

const closeBtn = {
  float: 'right',
  cursor: 'pointer',
  marginBottom: 30
}

const errorStyle = {
  color: 'red',
  fontSize: 12
}

function mapDispatchToProps(dispatch) {
  return{
    dispatch
  }
}
export default ReactRedux.connect(mapDispatchToProps)(ModalFood)