export default class MealMacros extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    const {
      userRemainingProtein,
      userRemainingFats,
      userRemainingCarbs,
      userRemainingCalories
    } = this.props

    return(
      <div className="col-sm-12 col-md-9">
        <div className="col-sm-12 macro-section">
          <label className="remaining-macros">Remaining Macros</label>
        </div>
         <div className="col-sm-12">
          <div className="row">
             <div className="col-sm-3 col-xs-6 macros">
              <p className="macros-quantity">{userRemainingProtein.toFixed(2)}</p>
              <p className="macros-name">protein</p>
            </div>            
            <div className="col-sm-3 col-xs-6 macros">
              <p className="macros-quantity">{userRemainingFats.toFixed(2)}</p>
              <p className="macros-name">fat</p>
            </div>
            <div className="col-sm-3 col-xs-6 macros">
              <p className="macros-quantity">{userRemainingCarbs.toFixed(2)}</p>
              <p className="macros-name">carbs</p>
            </div>
            <div className="col-sm-3 col-xs-6 macros">
              <p className="macros-quantity">{userRemainingCalories.toFixed(2)}</p>
              <p className="macros-name">calories</p>
            </div>       
          </div>                                 
        </div> 
      </div>
    );
  }
}