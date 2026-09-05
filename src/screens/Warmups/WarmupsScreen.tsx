import React, { useState } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity } from "react-native";
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import BackButton from "../../components/BackButton.tsx";

export default function WarmupsScreen({ navigation }: any) {
    const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
    const durationOptions = [6, 8, 10, 12, 13, 14, 15, 20, 30, 45, 60];
    const isButtonEnabled = selectedDuration !== null;

    const handleStartWarmups = () => {
        if (!isButtonEnabled) return;
        navigation.navigate('Timer', {
            sceneLength: selectedDuration,
            fromScreen: 'Warmups',
        });
    };

    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                <View style={sharedStyles.showSection3}>
                    <Text style={sharedStyles.showHeaderText}>How long for warmups?</Text>
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
                        onPress={handleStartWarmups}
                        disabled={!isButtonEnabled}
                    >
                        <View style={sharedStyles.showButtonInner}>
                            <Text style={sharedStyles.showButtonText}>Let's start warmups!</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <BackButton navigation={navigation} text="Back to Jam!" />
            </View>
        </BorderWrapper>
    );
}
