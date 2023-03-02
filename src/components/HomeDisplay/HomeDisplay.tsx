import { BACKGROUND_ASSETS } from "../../services/constants";

export default function HomeDisplay() {
  return (
    <div className="flex flex-col justify-between pic-cont">
      <div className="flex flex-wrap">
        <div className="w-6/12 px-4">
          {/* Use images with 1:1 aspect ratio for adjustment to design, if any other aspect ratio convert it to 1:1 */}
          <img
            height="800px"
            width="800px"
            src={BACKGROUND_ASSETS + `ccd221.jpg`}
            alt="background circle 1"
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
        <div className="w-4/12 px-4 pic2">
          <img
            height="800px"
            width="800px"
            src={BACKGROUND_ASSETS + `ccd222.jpg`}
            alt="background circle 1"
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-4/12 px-4 pic3">
          <img
            height="800px"
            width="800px"
            src={BACKGROUND_ASSETS + `ccd223.jpg`}
            alt="background circle 1"
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>
    </div>
  )
}