import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const firebaseConfig = {
  apiKey: "AIzaSyC-K9bYAv1RIsbE29iE9xRHiT_3XyWzwZ0",
  authDomain: "bean-f1602.firebaseapp.com",
  databaseURL: "https://bean-f1602.firebaseio.com",
  projectId: "bean-f1602",
  storageBucket: "bean-f1602.appspot.com",
  messagingSenderId: "546478099763",
  appId: "1:546478099763:web:cb43ebe7de34c6a82b0246",
  measurementId: "G-HC338643HJ",
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export { firebase };
