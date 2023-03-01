import React from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import { CurrentTheme } from '../../services/common.service';

interface PropsType {
  showGoTop: string;
  scrollUp: () => void;
}

const GoTop: React.FC<PropsType> = (props) => {
  return (
    <div className={`${props.showGoTop}`} onClick={props.scrollUp}>
      <button className=" block">
        <div className=" block z-50 fixed w-10 h-10 rounded-3xl right-4 bottom-4  cursor-pointer leading-7 text-center ">
          <BsArrowUpSquareFill color={CurrentTheme()} size={30} />
        </div>
      </button>
    </div>
  );
};

export default GoTop;
