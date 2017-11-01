import './HeaderMenu.scss'
import * as urlGenerators from 'routes/urlGenerators'
import { Link, IndexLink } from 'react-router'

class HeaderMenu extends React.Component {
  static propTypes = {
    userGet: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      data: PropTypes.object.isRequired,
      error: PropTypes.any
    })
  }

  state = {
    hidden: true
  }

  showHideMenu = (e) => {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  render () {
    const { userGet } = this.props
    const fitnessCoaching = userGet.data.data.attributes['has-fitness-coaching']
    const proPlan = userGet.data.data.attributes['has-iifym-pro']

    if (!userGet.data) return null

    if (this.state.hidden) {
      return <section id='nav'>
        <div className='container'>
          <ul id='main-nav-ul'>
            <li>
              <IndexLink activeClassName='active' to={urlGenerators.dashboardUrl()} >
                Dashboard<div className='arrow' />
              </IndexLink>
            </li>
            <li>
              <Link activeClassName='active' to={urlGenerators.shopUrl()}>
                Shop<div className='arrow' />
              </Link>
            </li>
            <li>
              <Link activeClassName='active' to={urlGenerators.mealPlansUrl}>
                Meal Plans<div className='arrow' />
              </Link>   
            </li>
            <li>
              <Link activeClassName='active' to={urlGenerators.communityUrl}>
                Community<div className='arrow' />
              </Link>
            </li>
            <li>
              <Link activeClassName='active' to={urlGenerators.contactMyCoachUrl()}>
                Contact My Coach<div className='arrow' />
              </Link>
            </li>
          </ul>
          <div className='burger-nav'>
            <button onClick={this.showHideMenu}>
              <div className='burger-paper'>
                <div className='bar one' />
                <div className='bar two' />
                <div className='bar three' />
              </div>
            </button>
          </div>
        </div>
      </section>
    } else {
      return <section id='nav'>
        <div className='container'>
          <ul id='main-nav-ul'>
            <li>
              <IndexLink activeClassName='active' to={urlGenerators.dashboardUrl()} >
                Dashboard<div className='arrow' />
              </IndexLink>
            </li>
            <li>
              <Link activeClassName='active' to={urlGenerators.shopUrl()}>
                Shop<div className='arrow' />
              </Link>
            </li>
            <li>
              <Link activeClassName='active' to={urlGenerators.mealPlansUrl}>
                Meal Plans<div className='arrow' />
              </Link>
            </li>
            <li>
              <Link activeClassName='active' to={urlGenerators.communityUrl}>
                Community<div className='arrow' />
              </Link>
            </li>
            <li>
              <Link activeClassName='active' to={urlGenerators.contactMyCoachUrl()}>
                Contact My Coach1<div className='arrow' />
              </Link>                
            </li>
            }
          </ul>
          <div className='burger-nav'>
            <button onClick={this.showHideMenu}>
              <div className='burger-paper'>
                <div className='bar one' />
                <div className='bar two' />
                <div className='bar three' />
              </div>
            </button>
            <div className='hidden-menu'>
              <ul id='hiddenmenu'>
                <li>
                  <IndexLink activeClassName='active' to={urlGenerators.dashboardUrl()} >
                    Dashboard
                  </IndexLink>
                </li>
                <li>
                  <Link activeClassName='active' to={urlGenerators.shopUrl()}>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link activeClassName='active' to={urlGenerators.mealPlansUrl}>
                    Meal Plans
                  </Link>
                </li>
                <li>
                  <Link activeClassName='active' to={urlGenerators.communityUrl}>
                    Community
                  </Link>
                </li>
                <li>                 
                  <Link activeClassName='active' to={urlGenerators.contactMyCoachUrl()}>
                    Contact My Coach<div className='arrow' />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    }
  }
}

export default HeaderMenu
