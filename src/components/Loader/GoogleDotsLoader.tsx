import LottieAnimation from '../Utils/LottieAnimation';
import animationData from '../../assets/animations/google-loader.json';

const GoogleDotsLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <LottieAnimation animationData={animationData} />
    </div>
  );
};

export default GoogleDotsLoader;
