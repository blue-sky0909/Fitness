import React from 'react';
import PropTypes from 'prop-types';
import {FaClose} from 'react-icons/lib/fa'
import {forumCreateCategory, forumupdateCategory} from '../../reducers/forumCategoriesGet'
class Modal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      categoryTitle: '',
      description: '',
      proAccess: false
    }

    this.setTitle = this.setTitle.bind(this)
    this.setDescription = this.setDescription.bind(this)
    this.setProAccess = this.setProAccess.bind(this)
  }

  componentDidMount() {
    if(this.props.id){
      this.setState({categoryTitle: this.props.title})
      this.setState({description: this.props.description})
    }
      
  }

  setTitle(e) {
    this.setState({categoryTitle: e.target.value})
  }

  setDescription(e) {
    this.setState({description: e.target.value})
  }

  setProAccess() {
    this.setState({proAccess: !this.state.proAccess})
  }

  submit =(e) =>{
    e.preventDefault()
    this.props.dispatch(forumupdateCategory(this.props.id, this.state.categoryTitle, this.state.description, this.state.proAccess))
    this.props.dispatch(this.props.onClose)
  }
  
  createCategory =(e) => {    
    e.preventDefault()
    this.props.dispatch(forumCreateCategory(this.state.categoryTitle, this.state.description, this.state.proAccess))
    
  }
  render() {    
    if(!this.props.show) {
      return null;
    }
    const {id, title, description} = this.props
    if(id) {
      return(
        <div className="backdrop">
          <div className="modal" style={modalStyle}>
            <FaClose onClick={this.props.onClose} style={closeBtn} />
            <form onSubmit={this.submit}>
              <div className="form-group">
                <input type="text" className="form-control"
                  value={this.state.categoryTitle} name="title"
                  onChange={this.setTitle} required/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" 
                name="description" value={this.state.description} onChange={this.setDescription} required/>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" name="proAccess" checked={this.state.proAccess} onChange={this.setProAccess} />
                  PREMIUM 
                </label>
              </div>                
              <div className="footer" style={footerStyle}>
                <button type="submit" className="btn btn-success" style={btnStyle} >Update Title</button>
                <button onClick={this.props.onClose} className="btn btn-default" style={btnStyle}>
                  Cancel
                </button>
              </div>
            </form>          
          </div>
        </div>
      )
    } else {
      return(
        <div className="backdrop">
          <div className="modal" style={modalStyle}>
            <FaClose onClick={this.props.onClose} style={closeBtn} />
            <form onSubmit={this.createCategory}>
              <div className="form-group">
                <input type="text" className="form-control"
                  value={this.state.categoryTitle} name="title"
                  onChange={this.setTitle} placeholder="Title" required/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Description"
                  name="description" value={this.state.description} onChange={this.setDescription} required/>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" name="proAccess" checked={this.state.proAccess} onChange={this.setProAccess} />
                  PREMIUM  
                </label>
              </div> 
              <div className="footer" style={footerStyle}>
                <button type="submit" className="btn btn-success" style={btnStyle} >Update Title</button>
                <button onClick={this.props.onClose} className="btn btn-default" style={btnStyle}>
                  Cancel
                </button>
              </div>
            </form>          
          </div>
        </div>
      )        
    }
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: 5,
  maxWidth: 500,
  minHeight: 300,
  height: 300,
  margin: '0 auto',
  padding: 30,
  display: 'block',
  marginTop: 150,
  position: 'absolute',
  zIndex: 99999,
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

function mapDispatchToProps(dispatch) {
  return{
    dispatch
  }
}
export default ReactRedux.connect(mapDispatchToProps)(Modal)