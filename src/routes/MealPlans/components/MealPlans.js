import './MealPlans.scss'
// import PaidContentContainer from 'containers/PaidContentContainer'
import MealPlansList from '../containers/MealPlansListContainer'

class MealPlans extends React.Component {
  render () {
    // return <PaidContentContainer requiredPlan='basic'>
    //   <section id='mealPlans' >
    //     <div className='container'>
    //       <h1>Meal Plans</h1>
    //     </div>
    //   </section>
    // </PaidContentContainer>

    return (
      <section id='mealPlans' >
        <MealPlansList />
      </section>
    )
  }
}

export default MealPlans
