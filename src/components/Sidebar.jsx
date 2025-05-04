export default function Sidebar(props){
  const {handleToggle,data} = props
  return(
    <div className="sideBar">
      <div className="bgOverlay"> </div>
        <div className="sideBarContent">
          <h2>{data?.title}</h2>
          <div className="descriptionContainer">
            <p className="decriptionTitle">{data?.date}</p>
            <p>{data?.explanation}</p>
          </div>
          <button onClick={handleToggle}>
          <i className="fa-solid fa-right-long"></i>
          </button>
      </div>
    </div>
  )
}