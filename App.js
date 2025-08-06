import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/store';
import * as SplashScreen from 'expo-splash-screen';
import MainNavigator from './src/navigation/mainNavigator';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
    'Roboto': require('./assets/fonts/Roboto-VariableFont_wdth,wght.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <Provider store={store}>
        <StatusBar style='light' />
        <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
});