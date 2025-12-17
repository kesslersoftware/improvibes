import React, { useState, useEffect } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity } from "react-native";
import BorderWrapper from '../../components/BorderWrapper';
import BackButton from '../../components/BackButton';
import { LOADING, JAM_SCREEN } from '../../styles/Constants';

export default function JamScreen({ navigation }: any) {
    // State management
    const [isLoading, setIsLoading] = useState(false);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [loadingDots, setLoadingDots] = useState('');

    // Loading dots animation
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingDots(prev => {
                    if (prev === '...') return '.';
                    return prev + '.';
                });
            }, 400);
            return () => clearInterval(interval);
        } else {
            setLoadingDots('');
        }
    }, [isLoading]);

    // Handle Warmups button press
    const handleWarmupsButtonPress = () => {
        setButtonsDisabled(true);
        setIsLoading(true);
        setTimeout(() => {
            navigation.navigate('Warmups');
        }, LOADING.LOADING_DELAY);
    };

    const reset = () => {
        setIsLoading(false);
        setButtonsDisabled(false);
    }
    // Handle Games button press
    const handleGamesButtonPress = () => {
        setButtonsDisabled(true);
        setIsLoading(true);
        setTimeout(() => {
            navigation.navigate('Game');
            reset();
        }, LOADING.LOADING_DELAY);
    };

    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                {/* Section 1: Header text */}
                <View style={sharedStyles.jamSection1}>
                    <Text style={sharedStyles.jamHeaderText}>Let's Jam!</Text>
                </View>

                {/* Section 2: Warmups button */}
                <View style={sharedStyles.jamSection2}>
                    <TouchableOpacity
                        style={sharedStyles.jamButtonOuter}
                        onPress={handleWarmupsButtonPress}
                        disabled={buttonsDisabled}
                    >
                        <View style={sharedStyles.jamButtonInner}>
                            <Text style={sharedStyles.jamButtonText}>Let's do Warmups!</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Section 3: Games button */}
                <View style={sharedStyles.jamSection3}>
                    <TouchableOpacity
                        style={sharedStyles.jamButtonOuter}
                        onPress={handleGamesButtonPress}
                        disabled={buttonsDisabled}
                    >
                        <View style={sharedStyles.jamButtonInner}>
                            <Text style={sharedStyles.jamButtonText}>Let's play Games!</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Section 4: Loading section */}
                <View style={sharedStyles.jamSection4}>
                    {isLoading && (
                        <Text style={sharedStyles.jamLoadingText}>Getting ready{loadingDots}</Text>
                    )}
                </View>

                {/* Bottom button: Back to Home */}
                <BackButton navigation={navigation} text="Back to Home!" />
            </View>
        </BorderWrapper>
    );
}