import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Faq from './pages/Faq'
import Schedule from './pages/Schedule'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
