import React from 'react';
import { useState } from 'react';
import { randomTextGoogleColor } from '../../services/common.service';

const defaultColor: string = 'text-gray-600';

export default function RandomColorWrapper({
  children,
  ...props
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [textColor, setTextColor] = useState(defaultColor);

  function handleMouseHover(): void {
    const color = randomTextGoogleColor;
    setTextColor(color);
  }

  function handleMouseLeave(): void {
    setTextColor(defaultColor);
  }

  return (
    <div
      className={`transition-colors duration-300 ease-in-out ${textColor}`}
      {...props}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
