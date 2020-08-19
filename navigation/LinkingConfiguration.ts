import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Challenge: {
            screens: {
              ChallengeScreen: 'challenge',
            },
          },
          Dictionary: {
            screens: {
              DictionaryScreen: 'myWords',
            },
          },
          MeMa: {
            screens: {
              MeMaScreen: 'mema',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          WOTD: {
            screens: {
              WOTDScreen: 'wordOfTheDay',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
