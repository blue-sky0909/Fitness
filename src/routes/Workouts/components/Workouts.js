import './Workouts.scss'
import PaidContentContainer from 'containers/PaidContentContainer'

class Workouts extends React.Component {
  render () {
    return <PaidContentContainer requiredPlan='basic'>
      <section id='workouts' >
        <div className='container' >
          <h1>Workouts</h1>
        </div>
      </section>
    </PaidContentContainer>
  }
}

export default Workouts
