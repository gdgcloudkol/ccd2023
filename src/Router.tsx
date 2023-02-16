import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavbarPage from './components/Navbar/Navbar'
import Coc from './pages/Coc'
import Dashboard from './pages/Dashboard'
import FaqPage from './pages/Faq'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Schedule from './pages/Schedule'
import Signup from './pages/Signup'
import Speakers from './pages/Speakers'
import Tickets from './pages/Tickets'

const Router = () => {
  return (
    <BrowserRouter>
      <NavbarPage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/coc" element={<Coc />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
