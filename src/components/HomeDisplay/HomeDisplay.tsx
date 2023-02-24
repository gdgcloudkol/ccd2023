export default function HomeDisplay() {
  return (
    <div className="flex flex-col justify-between pic-cont">
      <div className="flex flex-wrap">
        <div className="w-6/12 px-4">
          <img
            src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
            alt=""
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
        <div className="w-4/12 px-4 pic2">
          <img
            src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
            alt=""
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-4/12 px-4 pic3">
          <img
            src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
            alt=""
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>
    </div>
  )
}