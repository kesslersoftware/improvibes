import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sharedStyles } from '../../styles/SharedStyles';
import { COLORS } from '../../styles/Constants';
import { sh } from '../ScreenDimensionUtility';
import { RootStackParamList } from "../../../App.tsx";
import Hamburger from '../Hamburger/Hamburger';

interface HeaderBarProps {
    display?: boolean;
}

export default function HeaderBar({ display = true }: HeaderBarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <>
            <View style={sharedStyles.headerBar}>
                {display && (
                    <TouchableOpacity
                        style={sharedStyles.hamburgerButton}
                        onPress={() => setMenuOpen(true)}
                    >
                        <Ionicons name="menu" size={sh * 0.028 * 2} color={COLORS.BODY_TEXT_DARK} />
                    </TouchableOpacity>
                )}
                <Text style={sharedStyles.titleText}>ImprovLab</Text>
            </View>

            <Modal
                visible={menuOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMenuOpen(false)}
            >
                <Hamburger navigation={navigation} onClose={() => setMenuOpen(false)} />
            </Modal>
        </>
    );
}
