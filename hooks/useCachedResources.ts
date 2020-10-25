import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Image } from 'react-native';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        
        // Image Cache
        const imageAssets = cacheImages([
          require('../assets/images/Challenge.png'),
          require('../assets/images/Chinese.png'),
          require('../assets/images/Dictionary.png'),
          require('../assets/images/English.png'),
          require('../assets/images/HomeButton.png'),
          require('../assets/images/MEMALOGO.png'),
          require('../assets/images/MEMALOGO2.png'),
          require('../assets/images/Profile.png'),
          require('../assets/images/Spanish.png'),
          require('../assets/images/TalktoMema.png'),

        ]);

        // Load fonts
        const fontAssets = Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'mema-font-bold': require('../assets/fonts/CREABBB_.ttf'),
          'mema-font': require('../assets/fonts/CREABBRG.ttf')
        });

        await Promise.all([...imageAssets, fontAssets]);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}