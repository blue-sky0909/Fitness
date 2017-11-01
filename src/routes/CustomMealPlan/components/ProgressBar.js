class ProgressBar extends React.Component {

	constructor(props) {
		super(props);

		this.toggleClass = this.toggleClass.bind(this);
		this.state = {activeIndex: 0}
	}

	toggleClass(index, e) {
		this.setState({activeIndex: index});
	}	

	render() {
		return (
			<div className="progress-bar-wrap">
				<div className="text-wrap">
					<p className="personal-details">Enter your personal details</p>
				</div>
			</div>
		);
	}
}

export default ProgressBar;