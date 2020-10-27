import React from 'react';
import 'firebase/firestore';
import 'firebase/auth'
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './completion/HomeScreen'
import DonateScreen from './completion/DonateScreen'
import FindUsScreen from './completion/FindUsScreen'
import AboutUsScreen from './completion/AboutUsScreen'
import SettingsScreen from './completion/SettingsScreen'

const Home = () => {
    return (
        <HomeScreen />
    );
}
const Donate = () => {
    return (
        <DonateScreen />
    );
}
const FindUs = () => {
    return (
        <FindUsScreen />
    );
}
const AboutUs = () => {
    return (
        <AboutUsScreen />
    );
}
const Settings = (props) => {
    return (
        <SettingsScreen logOutNavigate={() => { props.logOutNavigate() }} />
    );
}

const Tab = createBottomTabNavigator();
export default function MainScreen(props) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'About us') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = 'ios-cog'
                    }
                    else if (route.name === 'Find us') {
                        iconName = 'ios-map'
                    }
                    else if (route.name === 'Donate') {
                        iconName = 'ios-water'
                    }
                    else if (route.name === 'Home') {
                        iconName = focused ? 'ios-heart' : 'ios-heart-empty'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Settings" children={() => { return <Settings logOutNavigate={() => { props.logOutNavigate() }} /> }} />
            <Tab.Screen name="Donate" component={Donate} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Find us" component={FindUs} />
            <Tab.Screen name="About us" component={AboutUs} />
        </Tab.Navigator>
    );
}