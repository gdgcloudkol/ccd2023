import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavbarPage from './components/Navbar/Navbar'
import Coc from './pages/Coc'
import Dashboard from './pages/Dashboard'
import FaqPage from './pages/Faq'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Schedule from './pages/Schedule/Schedule'
import Signup from './pages/Signup'
import Speakers from './pages/Speakers'
import Tickets from './pages/Tickets'
import { getFeature } from './services/feature.service'

const Router = () => {
  const [feature, setFeature] = useState([]);
  useEffect(() => {
    getFeature().then((data) => {
      if (data)
        setFeature(data.disabledRoutes);
    })
  }, [feature]);

  return (
    <BrowserRouter>
      <nav className="sticky top-0 z-30 w-full bg-white backdrop-filter backdrop-blur-md bg-opacity-30 ">
        <NavbarPage />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {feature?.every(item => "/schedule" !== item) ? <Route path="/schedule" element={<Schedule />} /> : null}
        {feature?.every(item => "/speakers" !== item) ? <Route path="/speakers" element={<Speakers />} /> : null}
        {feature?.every(item => "/faq" !== item) ? <Route path="/faq" element={<FaqPage />} /> : null}
        {feature?.every(item => "/tickets" !== item) ? <Route path="/tickets" element={<Tickets />} /> : null}
        {feature?.every(item => "/codeofconduct" !== item) ? <Route path="/code-of-conduct" element={<Coc />} /> : null}
        {feature?.every(item => "/signup" !== item) ? <Route path="/signup" element={<Signup />} /> : null}
        {feature?.every(item => "/login" !== item) ? <Route path="/login" element={<Login />} /> : null}
        {feature?.every(item => "/profile" !== item) ? <Route path="/profile" element={<Profile />} /> : null}
        {feature?.every(item => "/dashboard" !== item) ? <Route path="/dashboard" element={<Dashboard />} /> : null}
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
