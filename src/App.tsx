import React from 'react'
import './App.css'
import Loading from './components/Loader/Loader'
import Router from './Router'

function App() {
  const [initialLoad, setLoad] = React.useState<boolean>(false)
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLoad(false)
  //   }, 3500)
  // }, [])
  return <div className="App">{initialLoad ? <Loading /> : <Router />}</div>
}

export default App
