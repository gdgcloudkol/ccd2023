import { useEffect, useState } from 'react';
import PeopleGrid, { PeopleData } from '../components/PeopleGrid/PeopleGrid';
import { getContent } from '../services/content.service';
import { TEAM_CONTENT_KEY } from '../services/constants';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';

interface TeamData {
  team: string;
  data: PeopleData[];
}

const Team = () => {
  const [TeamDetails, setTeamDetails] = useState<TeamData[]>([{}] as TeamData[]);
  const [loader, setLoader] = useState<boolean>(true);
  useEffect(() => {
    getContent<TeamData[]>(TEAM_CONTENT_KEY).then((data: void | TeamData[]) => {
      if (data) {
        setTeamDetails(data);
        setLoader(false);
      }
    });
  }, []);

  return (
    loader ? <GoogleDotsLoader /> :
      <div className="max-w-7xl mx-auto mt-4 space-y-4">
        {TeamDetails.map((teams: TeamData, key: number) => {
          return (
            <div
              key={key}
              className="bg-[#1c1c1c] px-4 sm:px-6 lg:px-8 py-12 rounded-lg ring-1 ring-black ring-opacity-5 space-y-5"
              data-aos={key % 2 === 0 ? 'fade-right' : 'fade-left'}
              data-aos-delay={key * 100}
            >
              <h1 className="text-center text-4xl  md:text-left leading-10 font-extrabold tracking-tight sm:text-5xl sm:leading-none md:text-6xl text-white w-fit">
                {teams?.team}
              </h1>
              <PeopleGrid peopleGrid={teams?.data} modelAllowed={false} />
            </div>
          );
        })}
      </div>
  );
};

export default Team;
