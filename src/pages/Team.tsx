import PeopleGrid, { PeopleData } from '../components/PeopleGrid/PeopleGrid';

interface TeamData {
  team: string;
  data: PeopleData[]
}

const TeamDetails: TeamData[] = [
  {
    team: 'Web Team',
    data: [
      {
        fullName: 'Maaz',
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      },
      {
        fullName: 'Nasirul',
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      },
      {
        fullName: 'Srijan',
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      },
      {
        fullName: 'Sugato',
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePicture:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
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
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
        bio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
    <>
      {TeamDetails.map((teams: TeamData, key: number) => {
        return (
          <div key={key}>
            <h1 className=" px:5 text-center lg:text-start md:text-start md:px-10 lg:px-20 py-2 lg:py-5 text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 via-red-300 to-pink-600">
              {teams?.team}
            </h1>
            <PeopleGrid peopleGrid={teams?.data} />
          </div>
        );
      })}
    </>
  );
};

export default Team;
