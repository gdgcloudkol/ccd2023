import { CurrentTheme } from "../../services/common.service";
import { DARK, LOGO_ASSETS } from "../../services/constants";

const GdscBanner = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex justify-center items-center px-1 flex-col lg:grayscale hover:grayscale-0">
      <img
        src={LOGO_ASSETS + `gdsc-logo.svg`}
        className={`w-28 object-contain  ${CurrentTheme() === DARK ? '' : 'filter brightness-0 invert'}`}
        alt={`${label} logo`}
        aria-label={`${label} logo`}
      />
      <p className="flex flex-col items-center justify-center space-y-1 text-center dark:text-black">
        {
          label.startsWith('Google Developer Group') ?
            <span className="pt-4 flex font-medium text-xl">
              {label}
            </span>
            :
            <>
              <span className="pt-4 flex font-medium text-xl">
                Google Developer Student Club
              </span>
              <span className="text-[1.2rem]">{label}</span>
            </>
        }
      </p>
    </div>
  );
};

export default GdscBanner;
