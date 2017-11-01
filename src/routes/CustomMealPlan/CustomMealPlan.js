import './CustomMealPlan.scss';

import { Link } from 'react-router';
import { Route } from 'react-router';
import { mealPlanFormURL } from 'routes/urlGenerators';
import MealPlanForm from './components/MealPlanForm';

class CustomMealPlan extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return(
			
			<section id="custom-meal-plan">
				<div className="container">
					<h1>Custom Meal Plan</h1>
					<Link to={ mealPlanFormURL }>Fill Out Form</Link>
				</div>
			</section>

		);
	}
}

export default CustomMealPlan;