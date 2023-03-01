import { ReactElement, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import NavbarPage from './components/Navbar/Navbar';
import Team from './components/Team/Team';
import CFS from './pages/CFS';
import Coc from './pages/Coc';
import Dashboard from './pages/Dashboard';
import FaqPage from './pages/Faq';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule/Schedule';
import Signup from './pages/Signup';
import Speakers from './pages/Speakers';
import Tickets from './pages/Tickets';
import { getFeature } from './services/feature.service';
import { LoggedInContext } from './services/state.service';

const ScrollToTop = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

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
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {navRule?.every((item) => 'team' !== item) ? (
            <Route path="/team" element={<Team />} />
          ) : null}
          {navRule?.every((item) => 'schedule' !== item) ? (
            <Route path="/schedule" element={<Schedule />} />
          ) : null}
          {navRule?.every((item) => 'speakers' !== item) ? (
            <Route path="/speakers" element={<Speakers />} />
          ) : null}
          {navRule?.every((item) => 'faq' !== item) ? (
            <Route path="/faq" element={<FaqPage />} />
          ) : null}
          {navRule?.every((item) => 'codeofconduct' !== item) ? (
            <Route path="/code-of-conduct" element={<Coc />} />
          ) : null}
          {navRule?.every((item) => 'signup' !== item) ? (
            <Route path="/signup" element={<Signup />} />
          ) : null}
          {navRule?.every((item) => 'login' !== item) ? (
            <Route path="/login" element={<Login />} />
          ) : null}
          {navRule?.every((item) => 'cfs' !== item) ? (
            <Route path="/cfs" element={<CFS />} />
          ) : null}
          {navRule?.every((item) => 'profile' !== item) && loggedInState ? (
            <Route path="/profile" element={<Profile />} />
          ) : null}
          {navRule?.every((item) => 'tickets' !== item) && loggedInState ? (
            <Route path="/tickets" element={<Tickets />} />
          ) : null}
          {navRule?.every((item) => 'dashboard' !== item) && loggedInState ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : null}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
    </HashRouter>
  );
};

export default Router;
