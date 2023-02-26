import { useContext, useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import NavbarPage from './components/Navbar/Navbar';
import Coc from './pages/Coc';
import Dashboard from './pages/Dashboard';
import FaqPage from './pages/Faq';
import Home from './pages/Home';
import ApiLogin from './pages/Login';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule/Schedule';
import Signup from './pages/Signup';
import Speakers from './pages/Speakers';
import Tickets from './pages/Tickets';
import { getFeature } from './services/feature.service';
import { LoggedInContext } from './services/state.service';

const Router = () => {
  const { loggedInState } = useContext(LoggedInContext);
  const [navRule, setNavRule] = useState(['']);
  useEffect(() => {
    getFeature().then((data) => {
      if (data) setNavRule(data.disabledRoutes);
    });
  }, []);

  return (
    <HashRouter>
      <nav className="sticky top-0 z-30 w-full bg-white dark:bg-black dark:bg-opacity-0 backdrop-filter backdrop-blur-md bg-opacity-30 ">
        <NavbarPage />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {navRule?.every((item) => '/schedule' !== item) ? (
          <Route path="/schedule" element={<Schedule />} />
        ) : null}
        {navRule?.every((item) => '/speakers' !== item) ? (
          <Route path="/speakers" element={<Speakers />} />
        ) : null}
        {navRule?.every((item) => '/faq' !== item) ? (
          <Route path="/faq" element={<FaqPage />} />
        ) : null}
        {navRule?.every((item) => '/tickets' !== item) ? (
          <Route path="/tickets" element={<Tickets />} />
        ) : null}
        {navRule?.every((item) => '/codeofconduct' !== item) ? (
          <Route path="/code-of-conduct" element={<Coc />} />
        ) : null}
        {navRule?.every((item) => '/signup' !== item) ? (
          <Route path="/signup" element={<Signup />} />
        ) : null}
        {navRule?.every((item) => '/login' !== item) ? (
          <Route path="/login" element={<ApiLogin />} />
        ) : null}
        {navRule?.every((item) => '/profile' !== item) && loggedInState ? (
          <Route path="/profile" element={<Profile />} />
        ) : null}
        {navRule?.every((item) => '/dashboard' !== item) && loggedInState ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : null}
        <Route path="/*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
