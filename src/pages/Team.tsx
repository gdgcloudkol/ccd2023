import { useState } from 'react';
import { Helmet } from 'react-helmet';
import TeamContentData from '../assets/content/team/content.json';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';
import PeopleGrid, { PeopleData } from '../components/PeopleGrid/PeopleGrid';

interface TeamData {
  team: string;
  data: PeopleData[];
}

const Team = () => {
  const [TeamDetails] = useState<TeamData[]>(TeamContentData as TeamData[]);
  const [loader] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>Team | Google Cloud Community Days Kolkata 2023</title>
        <meta
          name="description"
          content="Meet the awesome team behind Google Cloud Community Days Kolkata 2023"
        />
      </Helmet>
      {loader ? (
        <GoogleDotsLoader />
      ) : (
        <div className="max-w-7xl overflow-x-hidden mx-auto mt-4 space-y-4">
          {TeamDetails.map((teams: TeamData, key: number) => {
            return (
              <div
                key={key}
                className="bg-[#1c1c1c] px-4 sm:px-6 lg:px-8 py-12 rounded-lg ring-1 ring-black ring-opacity-5 space-y-5"
                data-aos={key % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={key * 100}
              >
                <h1 className="text-center text-4xl md:text-left font-extrabold leading-none md:text-5xl text-white w-fit pb-2">
                  {teams?.team}
                </h1>
                <PeopleGrid peopleGrid={teams?.data} tagline={false} modelAllowed={false} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Team;
