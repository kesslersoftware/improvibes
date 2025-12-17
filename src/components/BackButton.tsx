import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../styles/SharedStyles';

interface BackButtonProps {
    navigation: any;
    text: string;
}

export default function BackButton({ navigation, text }: BackButtonProps) {
    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <View style={sharedStyles.backButtonSection}>
            <TouchableOpacity
                style={sharedStyles.backButton}
                onPress={handlePress}
            >
                <Text style={sharedStyles.backButtonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}
