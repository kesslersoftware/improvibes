import React, { useState, useEffect } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity } from "react-native";
import BorderWrapper from '../../components/BorderWrapper';
import {LOADING} from "../../styles/Constants";
import BackButton from "../../components/BackButton.tsx";

export default function WarmupsScreen({ navigation }: any) {
    // Handle "Back to Jam!" button press
    const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingDots, setLoadingDots] = useState('');
    const durationOptions = [6, 8, 10, 12, 13, 14, 15, 20, 30, 45, 60];

    // Check if button should be enabled
    const isButtonEnabled = selectedDuration !== null;
    const handleBackToJam = () => {
        navigation.navigate('Jam');
    };
    const reset = () => {
        setIsLoading(false);
        setSelectedDuration(null);
    };
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
    const handleStartWarmups = () => {
        if (!isButtonEnabled) return;
        setIsLoading(true);
        setTimeout(() => {
            // Navigate to Timer screen with the selected values
            navigation.navigate('Timer', {
                sceneLength: selectedDuration
            });
            reset();
        }, LOADING.LOADING_DELAY);
    };
    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                {/* Section 3: Header - Duration */}
                <View style={sharedStyles.showSection3}>
                    <Text style={sharedStyles.showHeaderText}>How long for warmups?</Text>
                </View>
                {/* Duration selector */}
                <View style={sharedStyles.showSection4}>
                    {durationOptions.map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={[
                                sharedStyles.showNumButton,
                                selectedDuration === num && sharedStyles.showNumButtonPressed
                            ]}
                            onPress={() => setSelectedDuration(num)}
                        >
                            <Text style={[
                                sharedStyles.showNumButtonText,
                                selectedDuration === num && sharedStyles.showNumButtonTextPressed
                            ]}>
                                {num}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <Text style={sharedStyles.timeButtonText}> minutes</Text>
                </View>

                {/* Section 5: "Let's start the show!" button */}
                <View style={sharedStyles.showSection5}>
                    <TouchableOpacity
                        style={[
                            sharedStyles.showButtonOuter,
                            !isButtonEnabled && sharedStyles.showButtonDisabled
                        ]}
                        onPress={handleStartWarmups}
                        disabled={!isButtonEnabled || isLoading}
                    >
                        <View style={sharedStyles.showButtonInner}>
                            <Text style={sharedStyles.showButtonText}>Let's start warmups!</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Section 6: Loading section */}
                <View style={sharedStyles.showSection6}>
                    {isLoading && (
                        <Text style={sharedStyles.showLoadingText}>Getting ready{loadingDots}</Text>
                    )}
                </View>
                {/* Bottom button: Back to Home */}
                <BackButton navigation={navigation} text="Back to Home!" />
            </View>
        </BorderWrapper>
    );
}