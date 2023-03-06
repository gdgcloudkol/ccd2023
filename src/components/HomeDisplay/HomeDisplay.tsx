import { BACKGROUND_ASSETS } from "../../services/constants";

export default function HomeDisplay() {
  return (
    <div className="flex flex-col justify-between pic-cont">
      <div className="flex flex-row">
        <div className="">
          {/* Use images with 1:1 aspect ratio for adjustment to design, if any other aspect ratio convert it to 1:1 */}
          <img
            height="450px"
            width="450px"
            src={BACKGROUND_ASSETS + `ccd221.jpg`}
            alt="background circle 1"
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
        <div className="mt-[15%]">
          <img
            height="300px"
            width="300px"
            src={BACKGROUND_ASSETS + `ccd222.jpg`}
            alt="background circle 1"
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>
      <div className="-mt-[10%] ml-[35%]">
        <div className="">
          <img
            height="300px"
            width="300px"
            src={BACKGROUND_ASSETS + `ccd223.jpg`}
            alt="background circle 1"
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>
    </div>
  )
}