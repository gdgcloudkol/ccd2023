import React from 'react';

const Background: React.FC<any> = ({ children }) => {
  return (
    <div className=" bg-white dark:bg-black transition-all">{children}</div>
  );
};

export default Background;
