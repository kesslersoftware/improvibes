import React, { useState, useEffect } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity } from "react-native";
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import BackButton from '../../components/BackButton';
import { LOADING, SHOW_SCREEN } from '../../styles/Constants';

export default function ShowScreen({ navigation }: any) {
    // State management
    const [selectedTeams, setSelectedTeams] = useState<number | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingDots, setLoadingDots] = useState('');
    // Options
    const teamOptions = [2, 3, 4, 5, 6];
    const durationOptions = [6, 8, 10, 12, 13, 14, 15, 20, 30, 45, 60];

    // Check if button should be enabled
    const isButtonEnabled = selectedTeams !== null && selectedDuration !== null;

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
    const reset = () => {
        setIsLoading(false);
        setSelectedTeams(null);
        setSelectedDuration(null);
    };
    // Handle "Let's start the show!" button press
    const handleStartShow = () => {
        if (!isButtonEnabled) return;
        setIsLoading(true);
        setTimeout(() => {
            // Navigate to Timer screen with the selected values
            navigation.navigate('Timer', {
                teams: selectedTeams,
                duration: selectedDuration
            });
            reset();
        }, LOADING.LOADING_DELAY);
    };
    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                {/* Section 1: Header - Teams */}
                <View style={sharedStyles.showSection1}>
                    <Text style={sharedStyles.showHeaderText}>How many Teams are performing?</Text>
                </View>

                {/* Section 2: Team number selector */}
                <View style={sharedStyles.showSection2}>
                    {teamOptions.map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={[
                                sharedStyles.showNumButton,
                                selectedTeams === num && sharedStyles.showNumButtonPressed
                            ]}
                            onPress={() => setSelectedTeams(num)}
                        >
                            <Text style={[
                                sharedStyles.showNumButtonText,
                                selectedTeams === num && sharedStyles.showNumButtonTextPressed
                            ]}>
                                {num}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <Text style={sharedStyles.timeButtonText}> teams</Text>
                </View>

                {/* Section 3: Header - Duration */}
                <View style={sharedStyles.showSection3}>
                    <Text style={sharedStyles.showHeaderText}>How much time per team?</Text>
                </View>

                {/* Section 4: Duration selector */}
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
                        onPress={handleStartShow}
                        disabled={!isButtonEnabled || isLoading}
                    >
                        <View style={sharedStyles.showButtonInner}>
                            <Text style={sharedStyles.showButtonText}>Let's start the show!</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Section 6: Loading section */}
                <View style={sharedStyles.showSection6}>
                    {isLoading && (
                        <Text style={sharedStyles.showLoadingText}>Getting ready{loadingDots}</Text>
                    )}
                </View>

                {/* Bottom button: Back to Jam */}
                <BackButton navigation={navigation} text="Back to Home!" />
            </View>
        </BorderWrapper>
    );
}