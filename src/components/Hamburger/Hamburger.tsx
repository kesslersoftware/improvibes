import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { sharedStyles } from '../../styles/SharedStyles';
import {RootStackParamList} from "../../../App";
import {
    HOME_SWITCH,
    ABOUT_US_SWITCH,
    INSTRUCTIONS_SWITCH,
    COLORS_SWITCH,
} from "../../../src/styles/Constants";

interface MenuItem {
    label: string;
    screen: keyof RootStackParamList;
    enabled: boolean;
}

const Hamburger = ({ navigation }: DrawerContentComponentProps) => {
    const menuItems: MenuItem[] = [
        { label: 'Home', screen: 'Home', enabled: HOME_SWITCH },
        { label: 'About Us', screen: 'About', enabled: ABOUT_US_SWITCH },
        { label: 'Instructions', screen: 'Instructions', enabled: INSTRUCTIONS_SWITCH },
        { label: 'Color Scheme', screen: 'Colors', enabled: COLORS_SWITCH },
    ];

    const handleNavigate = (screen: keyof RootStackParamList) => {
        navigation.navigate(screen as never);
        navigation.closeDrawer();
    };
    return (
        <View style={sharedStyles.hamburgerContainer}>
            <View style={sharedStyles.hamburgerHeader}>
                <Text style={sharedStyles.hamburgerHeaderText}>Menu</Text>
            </View>
            <ScrollView style={sharedStyles.hamburgerMenuContainer}>
                {menuItems
                    .filter((item) => item.enabled)
                    .map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={sharedStyles.hamburgerMenuItem}
                            onPress={() => handleNavigate(item.screen)}
                        >
                            <Text style={sharedStyles.hamburgerMenuItemText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
};

export default Hamburger;