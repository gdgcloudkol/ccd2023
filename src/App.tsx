import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import GoTop from './components/GoTop/GoTop';
import Router from './Router';

function App() {
  const [scrollPosition, setSrollPosition] = React.useState<number>(0);
  const [showGoTop, setshowGoTop] = React.useState<string>('goTopHidden');

  const refScrollUp = React.useRef<any>();

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoTopButton = () => {
    let position = window.scrollY;
    setSrollPosition(position);
    if (scrollPosition > 50) return setshowGoTop(() => 'block');
    if (scrollPosition < 50) return setshowGoTop(() => 'hidden');
  };

  React.useEffect(() => {
    if (scrollPosition < 50) setshowGoTop('hidden');
    const event = window.addEventListener('scroll', handleGoTopButton);
    return () => window.removeEventListener('scroll', handleGoTopButton);
  }, [scrollPosition]);

  React.useEffect(() => {
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
