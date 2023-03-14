import PeopleGrid, { PeopleData } from '../components/PeopleGrid/PeopleGrid';

interface TeamData {
  team: string;
  data: PeopleData[];
}

const TeamDetails: TeamData[] = [
  {
    team: 'Web Team',
    data: [
      {
        fullName: 'Maaz Ahmed',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture: 'https://github.com/maaz619.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      },
      {
        fullName: 'Nasirul Haque',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture: 'https://github.com/lurisan.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      },
      {
        fullName: 'Srijan Gupta',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture: 'https://github.com/geekymeeky.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      },
      {
        fullName: 'Sugato Bagchi',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture: 'https://github.com/SugatoBagchi.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      }
    ]
  },
  {
    team: 'App Team',
    data: [
      {
        fullName: 'Shubhayu',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'App Dev'
      },
      {
        fullName: 'Shantanik',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'App Dev'
      },
      {
        fullName: 'Priyasu',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'App Dev'
      }
    ]
  },
  {
    team: 'Backend Team',
    data: [
      {
        fullName: 'Debika',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Python Dev'
      },
      {
        fullName: 'Ankan',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Python Dev'
      }
    ]
  },
  {
    team: 'UX Team',
    data: [
      {
        fullName: 'Arindam',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Designer'
      },
      {
        fullName: 'Anurag',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Designer'
      }
    ]
  }
];

const Team = () => {
  return (
    <div className="max-w-7xl mx-auto mt-4 space-y-4">
      {TeamDetails.map((teams: TeamData, key: number) => {
        return (
          <div
            key={key}
            className="bg-[#1c1c1c] px-4 sm:px-6 lg:px-8 py-12 rounded-lg ring-1 ring-black ring-opacity-5"
            data-aos={key % 2 === 0 ? 'fade-right' : 'fade-left'}
            data-aos-delay={key * 100}
          >
            <h1 className="text-center text-4xl  md:text-left leading-10 font-extrabold tracking-tight sm:text-5xl sm:leading-none md:text-6xl text-white w-fit">
              {teams?.team}
            </h1>
            <PeopleGrid peopleGrid={teams?.data} />
          </div>
        );
      })}
    </div>
  );
};

export default Team;
