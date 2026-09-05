import React, { useState } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity } from "react-native";
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import BackButton from '../../components/BackButton';

export default function ShowScreen({ navigation }: any) {
    const [selectedTeams, setSelectedTeams] = useState<number | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

    const teamOptions = [2, 3, 4, 5, 6];
    const durationOptions = [6, 8, 10, 12, 13, 14, 15, 20, 30, 45, 60];
    const isButtonEnabled = selectedTeams !== null && selectedDuration !== null;

    const handleStartShow = () => {
        if (!isButtonEnabled) return;
        navigation.navigate('Timer', {
            teams: selectedTeams,
            duration: selectedDuration,
        });
    };

    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                <View style={sharedStyles.showSection1}>
                    <Text style={sharedStyles.showHeaderText}>How many Teams are performing?</Text>
                </View>

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

                <View style={sharedStyles.showSection3}>
                    <Text style={sharedStyles.showHeaderText}>How much time per team?</Text>
                </View>

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

                <View style={sharedStyles.showSection5}>
                    <TouchableOpacity
                        style={[
                            sharedStyles.showButtonOuter,
                            !isButtonEnabled && sharedStyles.showButtonDisabled
                        ]}
                        onPress={handleStartShow}
                        disabled={!isButtonEnabled}
                    >
                        <View style={sharedStyles.showButtonInner}>
                            <Text style={sharedStyles.showButtonText}>Let's start the show!</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <BackButton navigation={navigation} text="Back to Home!" />
            </View>
        </BorderWrapper>
    );
}
