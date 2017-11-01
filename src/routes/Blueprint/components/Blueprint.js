import './Blueprint.scss';
import PageOne from './FormPages/PageOne';
import PageTwo from './FormPages/PageTwo';
import PageThree from './FormPages/PageThree';
import PageFour from './FormPages/PageFour';

import {Link } from 'react-router';

import { blueprintPageOneURL } from 'routes/urlGenerators';
import { blueprintPageTwoURL } from 'routes/urlGenerators';
import { blueprintPageThreeURL } from 'routes/urlGenerators';
import { blueprintPageFourURL } from 'routes/urlGenerators';

{/* The form components such as input will probably need to be replaced with custom components */}

class Blueprint extends React.Component {
	
	render() {
		return (
			<section id="nav-wrap">
				<div className="container">
					{/* <Link to={blueprintPageOneURL}>Page One</Link>
					<br/>
					<Link to={blueprintPageTwoURL}>Page Two</Link>
					<br/>
					<Link to={blueprintPageThreeURL}>Page Three</Link>
					<br/>
					<Link to={blueprintPageFourURL}>Page Four</Link>
					<br/> */}
				</div>
			</section>
		);
	}
}

export default Blueprint;