import './Community.scss'
import ForumCategoriesListContainer from '../containers/ForumCategoriesListContainer'

class Community extends React.Component {
  render () {
    return <section id='community'>
      <div className='container' >
        <div className='row'>
          <ForumCategoriesListContainer />
        </div>
      </div>
    </section>
  }
}

export default Community
