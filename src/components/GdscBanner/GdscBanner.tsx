const GdscBanner = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex justify-center items-center px-2 flex-col">
      <img
        src="/images/logos/gdsc-logo.svg"
        className="w-20 object-contain"
        alt={`${label} logo`}
        aria-label={`${label} logo`}
      />
      <p className="flex flex-col items-center justify-center space-y-1 text-center text-[#757575] dark:text-white">
        <span className="flex font-medium text-sm">
          Google Developer Student Clubs
        </span>
        <span className="text-[0.6rem]">{label}</span>
      </p>
    </div>
  );
};

export default GdscBanner;
