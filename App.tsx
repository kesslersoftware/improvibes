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
import AboutScreen from './src/screens/About/AboutScreen';
import InstructionsScreen from './src/screens/Instructions/InstructionsScreen';
import ColorsScreen from './src/screens/Colors/ColorsScreen';
import ConfigureJamsScreen from './src/screens/ConfigureJams/ConfigureJamsScreen';

export type RootStackParamList = {
  Start: undefined;
  Home: undefined;
  Jam: undefined;
  Warmups: undefined;
  Details: undefined;
  Show: undefined;
  Game: undefined;
  Timer: { teams?: number; duration?: number; sceneLength?: number; fromScreen?: 'Game' | 'Warmups' };
  About: undefined;
  Instructions: undefined;
  Colors: undefined;
  ConfigureJams: undefined;
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
          <Stack.Screen name="Jam" component={JamScreen} />
          <Stack.Screen name="Show" component={ShowScreen} />
          <Stack.Screen name="Warmups" component={WarmupsScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Timer" component={TimerScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Instructions" component={InstructionsScreen} />
          <Stack.Screen name="Colors" component={ColorsScreen} />
          <Stack.Screen name="ConfigureJams" component={ConfigureJamsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
