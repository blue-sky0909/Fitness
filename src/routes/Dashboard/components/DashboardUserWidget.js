import './DashboardUserWidget.scss'
import Avatar from 'components/Avatar'

class DashboardUserWidget extends React.Component {
  static propTypes = {
    userGet: PropTypes.object.isRequired
  }

  render () {
    const { userGet } = this.props
    if (!userGet.data) return null

    return <section id='main-my-profile'>
      <div className='container'>
        <div className='row'>

          <div className='col-md-3'>
            <div className='image-holder'>
              <Avatar
                image={userGet.data.data.attributes.avatar}
                size='big' />
            </div>
          </div>

          <div className='col-md-9'>
            <div className='account-display-info'>
              <div className='row'>
                <div className='col-md-7 main-my-profile-title'>
                  <h2>My macros</h2>
                  {
                    userGet.data.data.attributes['fitness-goal'] &&
                    <p>Goal: <span className='myGoal'>{userGet.data.data.attributes['fitness-goal']}</span></p>
                  }
                </div>

                <div className='col-md-5 text-right'>
                  <a href='https://www.iifym.com/iifym-calculator/' className='calcBtn'>
                    <i className='fa fa-external-link' aria-hidden='true' /> Calculator
                  </a>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-3'>
                  <span className='macroValue'>{userGet.data.data.attributes.calories}</span>
                  <span className='macroName'>Calories</span>
                </div>
                <div className='col-md-3'>
                  <span className='macroValue'>{userGet.data.data.attributes.protein}</span>
                  <span className='macroName'>Protein</span>
                </div>
                <div className='col-md-3'>
                  <span className='macroValue'>{userGet.data.data.attributes.carbs}</span>
                  <span className='macroName'>Carbs</span>
                </div>
                <div className='col-md-3'>
                  <span className='macroValue'>{userGet.data.data.attributes.fats}</span>
                  <span className='macroName'>Fat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

export default DashboardUserWidget
