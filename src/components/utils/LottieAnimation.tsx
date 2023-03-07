import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
  [key: string]: any;
}

const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  style = {},
  ...props
}: LottieAnimationProps) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: AnimationItem | undefined;
    if (animationContainer.current) {
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop,
        autoplay,
        animationData
      });
    }
    return () => {
      anim?.destroy();
    };
  }, [animationData, autoplay, loop]);

  return (
    <div
      ref={animationContainer}
      style={{
        ...style,
        width: '100%',
        height: '100%'
      }}
      {...props}
    />
  );
};

export default LottieAnimation;
