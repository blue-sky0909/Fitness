
function CompleteButton ( props ) {
  return (
    <div className="button-wrap complete">
      <button className="btn btn-danger" type="submit" style={btnStyle}>Complete</button>
    </div>
  )
}
const btnStyle = {
  width: 200,
  fontSize: 20,
  textTransform: 'uppercase'
}
export default CompleteButton
