import * as Content from '../assets/content/coc/content.json'
import { COCContent } from '../assets/models/coc/datatype';
const Coc = () => {
  const content = Content;
  const CocContent: COCContent = {
    title: content.title,
    description: content.description,
    sections: content.sections
  }
  return (
    <>
      <div className="flex items-center">
        <div className="md:w-full max-w-7xl mx-auto my-12">
          <div className="px-4">
            <div className="text-3xl font-normal text-g-gray-8">
              {CocContent.title}
            </div>
            <div className="text-base text-g-gray-7 lg:w-3/4 mt-4">
              {CocContent.description}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-around bg-g-gray-1 lg:rounded-2xl p-4 mt-12">
            {CocContent.sections.map((el, i) => {
              return (
                <div className="lg:w-1/3 md:w-full"
                  key={i + ''}
                >
                  <div className="text-xl text-g-gray-8 mb-4">
                    {el.title}
                  </div>
                  <div className="text-base text-g-gray-7 text-justify">
                    {el.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Coc