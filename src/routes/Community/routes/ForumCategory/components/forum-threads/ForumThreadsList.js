import './ForumThreadsList.scss'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import ForumThreadsListItem from './ForumThreadsListItem'
import {orderTopic} from '../../../../../../store/userGet'
import {connect} from 'react-redux'

class ForumThreadsList extends React.Component {
  static propTypes = {
    threads: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      data: PropTypes.object,
      error: PropTypes.any
    }),
    categoryId: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props)
    this.sortThreads = this.sortThreads.bind(this);
    this.showMembership = this.showMembership.bind(this)
  }

  componentWillMount () {
  }

  sortThreads(threads) {
    let dateThreads = _.sortBy(threads, ['last_activity_at']);
    let stickyThreads = _.sortBy(dateThreads, ['sticky']);
    return _.reverse(stickyThreads);
  }

  showMembership() {
    this.props.showMembership()
  }

  render () {
    const { threads, categoryId, orderFlag, selectedCategory, userInfo } = this.props
    if (threads.loading && !threads.data) {
      return <LoadingIndicator type='grid' />
    } else if (threads.error) {
      return <ErrorAlert error={threads.error} />
    } else if (threads.loaded || threads.data) {
      let orderedThreads = this.sortThreads(threads.data.formattedData || []);
      return <ul id='forumThreadsList' className='table-responsive'>
        {
          _.map(
            orderedThreads,
            (item) => <ForumThreadsListItem
              item={item}
              categoryId={categoryId}
              key={item.id}
              selectedCategory={selectedCategory}
              userInfo={userInfo}
              showMembership={this.showMembership} />)         
        }
      </ul>
    }

    return null
  }
}

let mapDispatchToProps = (state) => {
  return {
    orderFlag: state.userGet.orderFlag,
   // threadId: state
  }
}
export default connect(mapDispatchToProps)(ForumThreadsList) 
