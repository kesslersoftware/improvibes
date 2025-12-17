import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartScreen from './src/screens/Start/StartScreen';
import DetailsScreen from './src/screens/Details/DetailsScreen.tsx';
import TimerScreen from './src/screens/Timer/TimerScreen';
import HomeScreen from "./src/screens/Home/HomeScreen.tsx";
import JamScreen from "./src/screens/Jam/JamScreen.tsx";
import ShowScreen from "./src/screens/Show/ShowScreen.tsx";
import GameScreen from "./src/screens/Game/GameScreen.tsx";
import WarmupsScreen from "./src/screens/Warmups/WarmupsScreen.tsx";

export type RootStackParamList = {
  Start: undefined;
  Home: undefined;
  Timer: undefined;
  Jam: undefined;
  Warmups: undefined;
  Details: undefined;
  Show: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Timer" component={TimerScreen} />
            <Stack.Screen name="Jam" component={JamScreen} />
            <Stack.Screen name="Show" component={ShowScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Warmups" component={WarmupsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
