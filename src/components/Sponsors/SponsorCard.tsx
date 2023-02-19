interface ISponsorCardProps {
  name: string;
  image: string;
  link: string;
  type: string;
}

const SponsorCard = ({ name, image, link, type }: ISponsorCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 max-w-xs">
      <p className="text-2xl font-bold text-gray-900 uppercase tracking-widest leading-loose">
        {type}
      </p>
      <a
        className="rounded cursor-pointer flex justify-center items-center hover:scale-105 hover:ease-in duration-300"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={image}
          alt={`${name} logo`}
          className="w-full h-32 object-contain img-border"
          aria-label={`${name} logo`}
        />
      </a>
    </div>
  );
};

export default SponsorCard;
