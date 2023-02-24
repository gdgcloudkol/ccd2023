import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import GoTop from './components/GoTop/GoTop';
import Router from './Router';
import { clearLocalStorage } from './services/state.service';

function App() {
  const [scrollPosition, setSrollPosition] = useState<number>(0);
  const [showGoTop, setshowGoTop] = useState<string>('goTopHidden');

  const refScrollUp = useRef<any>();

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoTopButton = () => {
    let position = window.scrollY;
    setSrollPosition(position);
    if (scrollPosition > 50) return setshowGoTop(() => 'block');
    if (scrollPosition < 50) return setshowGoTop(() => 'hidden');
  };

  useEffect(() => {
    if (scrollPosition < 50) setshowGoTop('hidden');
    window.addEventListener('scroll', handleGoTopButton);
    return () => window.removeEventListener('scroll', handleGoTopButton);
  }, [scrollPosition]);

  useEffect(() => {
    clearLocalStorage()
    AOS.init({
      duration: 1000,
      once: true
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div className="App min-h-screen">
      <div ref={refScrollUp}>
        <GoTop showGoTop={showGoTop} scrollUp={handleScrollUp} />
      </div>
      <Router />
      <Footer />
    </div>
  );
}

export default App;
