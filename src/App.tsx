import React from 'react'
import './App.css'
import Loading from './components/Loader/Loader'
import Home from './pages/Home'

function App() {
  const [initialLoad, setLoad] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 3500)
  }, [])
  return <div className="App">{initialLoad ? <Loading /> : <Home />}</div>
}

export default App
