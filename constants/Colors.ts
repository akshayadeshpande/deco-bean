const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const tintColorDefault = '#FCEB97';
const tintColorInactive = '#FCEB97';
const tintColorActive = '#FF9E1C';
const backgroundColorDefault = '#177AC1';
const bottomTabColorDefault = '#2D9CDB';

export default {
  light: {
    text: '#fff',
    background: backgroundColorDefault,
    bottomTabBackground: bottomTabColorDefault,
    tint: tintColorDefault,
    inactiveTint: tintColorInactive,
    activeTint: tintColorActive,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDefault,
  },
  dark: {
    text: '#fff',
    background: backgroundColorDefault,
    bottomTabBackground: bottomTabColorDefault,
    tint: tintColorDefault,
    inactiveTint: tintColorInactive,
    activeTint: tintColorActive,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorActive,
  },
  // Defaults left here for reference.
  // light: {
  //   text: '#000',
  //   background: '#fff',
  //   tint: tintColorLight,
  //   tabIconDefault: '#ccc',
  //   tabIconSelected: tintColorLight,
  // },
  // dark: {
  //   text: '#fff',
  //   background: '#000',
  //   tint: tintColorDark,
  //   tabIconDefault: '#ccc',
  //   tabIconSelected: tintColorDark,
  // }
};
