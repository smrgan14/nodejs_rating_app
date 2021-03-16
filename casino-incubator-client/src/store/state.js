export default {
  emotionsSettings: [
    {
      id: 1, status: 'Happy', icon: 'sentiment_very_satisfied', color: '#283d3d', borderColor: '#00a86b', chartColor: '#04D27C',
    },
    {
      id: 2, status: 'Satisfied', icon: 'sentiment_satisfied', color: '#2f3e4a', borderColor: '#41B3E9', chartColor: '#4aacc5',
    },
    {
      id: 3, status: 'Meh', icon: 'sentiment_dissatisfied', color: '#42343c', borderColor: '#f9585a', chartColor: '#B0B0B2',
    },
    {
      id: 4, status: 'Dissatisfied', icon: 'sentiment_very_dissatisfied', color: '#423e34', borderColor: '#FF8C00', chartColor: '#FFA500',
    },
    {
      id: 5, status: 'Sad', icon: 'mood_bad', color: '#35383f', borderColor: '#95969a', chartColor: '#F9585A',
    },
  ],
  filteredEmotions: [],
  emotionsLineChartData: [],
  emotionsPieChartData: [],
  emotionsTableData: [],
  errorMessage: null,
  accessToken: null,
  config: {
    emotions: [],
    numberOfEmotions: null,
    messageTimeOut: null,
    ratingMessage: '',
    translations: [],
  },
  userInfo: {
    fullName: null,
    company: null,
    profilePicture: null,
  },
  translations: {
    welcome: 'Welcome to rating app',
    settings: 'Settings',
    today: 'Today',
    reports: 'Reports',
    logout: 'Logout',
    ratings: 'Ratings',
    emotions: 'emotions',
    count: 'count',
    emotionPreview: 'Emotions preview',
    todayCheck: 'Today is a new day. Check your ratings!',
    graphs: 'Graphs present you rating result. Today you have 225 rates, check it on dashboard.',
    rateService: 'Rate our service!',
    cancel: 'Cancel',
    ok: 'OK',
    serverErrorMesage: 'There is a problem connecting to server!',
  },
};
