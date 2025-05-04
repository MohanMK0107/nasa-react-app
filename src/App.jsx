import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"

function App() {
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(false)
  const [showModel,setshowModel] = useState(false)  
  
  function handleToggle(){
    setshowModel(!showModel)
  }
  
  useEffect(() => {
    async function fethAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' +
      `?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString()
      const localkey = `NASA-${today}`
      if(localStorage.getItem(localkey)) {
        const apiData = JSON.parse(localStorage.getItem
          (localkey))
          setData(apiData)
          console.log('fetched from cache today')
          return
      }
      localStorage.clear()


      try{
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localkey,JSON.stringify(apiData))
        setData(apiData)
        console.log('fetched from API today')
      } catch(err){
        console.log(err.message)
      }
    }
    fethAPIData()
  }, {})
  return (
    <>
      {data ?(<Main data={data}/>):
      <div className="loadingState">
        <i className ="fa-solid fa-gear"></i>
        </div>
        }
      {showModel && (
        <Sidebar data={data} handleToggle={handleToggle}/>
        )}
      {data && (
        <Footer data={data} handleToggle={handleToggle}/>
        )}
    </>
  )
}

export default App
