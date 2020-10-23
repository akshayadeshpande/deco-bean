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
              WordScreen: 'wordDetails',
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
              FriendsScreen: 'friends',
              FriendsProfileScreen: 'friendsProfile',
            },
          },
          Word: {
            screens: {
              WordScreen: 'wordDetails',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
