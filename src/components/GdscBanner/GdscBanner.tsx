import { CurrentTheme } from "../../services/common.service";
import { DARK, LOGO_ASSETS } from "../../services/constants";

const GdscBanner = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex justify-center items-center px-2 flex-col">
      <img
        src={LOGO_ASSETS + `gdsc-logo.svg`}
        className={`w-20 object-contain  ${CurrentTheme() === DARK ? '' : 'filter brightness-0 invert'}`}
        alt={`${label} logo`}
        aria-label={`${label} logo`}
      />
      <p className="flex flex-col items-center justify-center space-y-1 text-center dark:text-black">
        <span className="flex font-medium text-sm">
          Google Developer Student Club
        </span>
        <span className="text-[0.6rem]">{label}</span>
      </p>
    </div>
  );
};

export default GdscBanner;
