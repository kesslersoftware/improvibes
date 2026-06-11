import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import Hamburger from './src/components/Hamburger/Hamburger';

export type RootStackParamList = {
  Start: undefined;
  Main: undefined;
  Home: undefined;
  Timer: undefined;
  Jam: undefined;
  Warmups: undefined;
  Details: undefined;
  Show: undefined;
  Game: undefined;
  About: undefined;
  Instructions: undefined;
  Colors: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Hamburger {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Timer" component={TimerScreen} />
      <Drawer.Screen name="Jam" component={JamScreen} />
      <Drawer.Screen name="Show" component={ShowScreen} />
      <Drawer.Screen name="Details" component={DetailsScreen} />
      <Drawer.Screen name="Game" component={GameScreen} />
      <Drawer.Screen name="Warmups" component={WarmupsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Instructions" component={InstructionsScreen} />
      <Drawer.Screen name="Colors" component={ColorsScreen} />
    </Drawer.Navigator>
  );
}

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
          <Stack.Screen name="Main" component={MainDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
