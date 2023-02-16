import partners from '../../assets/content/partners/content.json'
import GdscBanner from '../GdscBanner/GdscBanner'

const CommunityPartners = () => {
  const { community_partners } = partners
  return (
    <section
      id="partners"
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <h2 className="text-center text-3xl font-bold text-gray-900">
        Community Partners
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-4 place-items-center">
        {community_partners.sponsors.map((partner) => {
          return (
            <div
              className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1 img-border h-full w-full"
              key={partner.sponsorId}
            >
              <a
                className="w-fit rounded cursor-pointer flex justify-center items-center"
                href={partner.hyperlink}
                target="_blank"
                rel="noreferrer"
              >
                {/* Put all images in the assets/images/communityPartners/ */}
                {partner.sponsorId.startsWith('dsc') ? (
                  <GdscBanner label={partner.sponsorName} />
                ) : (
                  <img
                    src={require(`../../assets/images/communityPartners/placeholder.png`)}
                    alt={`${partner.sponsorName} logo`}
                    className="w-full h-20 object-contain"
                    aria-label={`${partner.sponsorName} logo`}
                  />
                )}
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CommunityPartners
