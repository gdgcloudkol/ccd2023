import React from 'react';
import { useState } from 'react';
import { randomTextGoogleColor } from '../../services/common.service';

export default function RandomColorWrapper({
  children,
  defaultColor = 'text-gray-600',
  ...props
}: {
  children: React.ReactNode;
  defaultColor?: string;
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
