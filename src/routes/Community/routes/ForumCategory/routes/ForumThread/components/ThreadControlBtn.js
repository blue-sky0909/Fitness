import './ThreadControlBtn.scss'
import { default as Dropdown, DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import {FaTrashO, FaLock, FaEyeSlash, FaEllipsisV, FaUnlock} from 'react-icons/lib/fa'
import { forumThreadDelete, forumThreadLock, forumThreadUnlock } from '../../../reducers/forumThreadsGet'

const ReactToastr = require("react-toastr");
const {ToastContainer} = ReactToastr; 
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class ThreadControlBtn extends React.Component {
  constructor(props) {
    super(props)

    this.deleteThread = this.deleteThread.bind(this)
    this.lockThread = this.lockThread.bind(this)
    this.UnlockThread = this.UnlockThread.bind(this)
  }

  hideDropdown = () => {
    this.dropdown.hide()
  }

  dropdownRef = (el) => {
    this.dropdown = el
  }

  deleteThread() {
    this.props.dispatch(forumThreadDelete(this.props.threadId, this.props.categoryId))
    this.hideDropdown()
  }


  lockThread() {
    this.props.dispatch(forumThreadLock(this.props.threadId, this.props.categoryId))
    this.hideDropdown()
    this.refs.message.success(
      "",
      "This thread is locked successfully", {
      timeOut: 2000,
      extendedTimeOut: 2000
    });
  }
  UnlockThread() {
    this.props.dispatch(forumThreadUnlock(this.props.threadId, this.props.categoryId))
    this.hideDropdown()
    this.refs.message.success(
      "",
      "This thread is unlocked successfully", {
      timeOut: 2000,
      extendedTimeOut: 2000
    });
  }
  render () {
    const {threadId } = this.props
    return<div>
      <ToastContainer ref="message"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right" /> 
      <Dropdown ref={(dropdown) => { this.dropdown = dropdown }} className='share-dropdown' >
        <DropdownTrigger className='headerWelcome'>
          <FaEllipsisV size="30"/>        
        </DropdownTrigger>
        <DropdownContent>
          <div className='arrow' />
            <div className="control-item" onClick={this.deleteThread}>
              <FaTrashO size="30"/> <span>Delete Thread</span>    
            </div>
            {
              this.props.threadData.locked == true ?
                <div className="control-item" onClick={this.UnlockThread}>
                  <FaUnlock size="30" /> <span>Unlock Thread</span>
                </div>
              : <div className="control-item" onClick={this.lockThread}>
                  <FaLock size="30" /> <span>Lock Thread</span>
                </div>
            }
            
        </DropdownContent>
      </Dropdown>
    </div>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default ReactRedux.connect(mapDispatchToProps)(ThreadControlBtn)
