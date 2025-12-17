import React, { useEffect, useState, useRef } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import BorderWrapper from '../../components/BorderWrapper';
import BackButton from '../../components/BackButton';
import { TIMER_SCREEN } from '../../styles/Constants';

export interface TimerScreenProps {
    teams?: number;
    duration?: number;
    sceneLength?: number;
}

export default function TimerScreen({ route, navigation }: any) {
    // Determine which scenario we're in
    const teams = route?.params?.teams;
    const duration = route?.params?.duration;
    const sceneLength = route?.params?.sceneLength;

    // Scenario #1: Teams mode (from ShowScreen)
    const isTeamsMode = teams !== undefined && duration !== undefined;

    // Scenario #2: Single scene mode (from DetailsScreen)
    const timerDuration = isTeamsMode ? duration : sceneLength || 5;

    // State for teams mode
    const [currentTeam, setCurrentTeam] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

    // Convert minutes to seconds for countdown
    const [timeRemaining, setTimeRemaining] = useState(timerDuration * 60);
    const [isExpired, setIsExpired] = useState(false);

    // Animation for waving flag
    const waveAnim = useRef(new Animated.Value(0)).current;

    // Countdown timer effect
    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (!isExpired) {
            // Timer has expired
            setIsExpired(true);
            startWaveAnimation();

            // In teams mode, show the next button (unless this is the last team)
            if (isTeamsMode && currentTeam < teams!) {
                setShowNextButton(true);
                setNextButtonDisabled(false);
            }
        }
    }, [timeRemaining, isExpired, isTeamsMode, currentTeam, teams]);

    // Start waving flag animation
    const startWaveAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(waveAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(waveAnim, {
                    toValue: -1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(waveAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle "next team" button press
    const handleNextTeam = () => {
        // Disable the button
        setNextButtonDisabled(true);
        setShowNextButton(false);

        // Move to next team
        setCurrentTeam(currentTeam + 1);

        // Reset timer state
        setTimeRemaining(timerDuration * 60);
        setIsExpired(false);

        // Stop the wave animation
        waveAnim.setValue(0);
    };

    // Wave animation rotation
    const waveRotation = waveAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-15deg', '15deg'],
    });

    return (
        <BorderWrapper>
            <View style={sharedStyles.timerContainer}>
                {/* Header - Shows team info or game logo */}
                <View style={sharedStyles.showSection3}>
                    <Text style={sharedStyles.showHeaderText}>
                        {isTeamsMode ? `Team ${currentTeam}, take it away!` : TIMER_SCREEN.TIMER_SCREEN_GAME_LOGO}
                    </Text>
                </View>

                {/* Timer Section */}
                <View style={sharedStyles.timerSection}>
                    <Text style={sharedStyles.timerText}>
                        {formatTime(timeRemaining)}
                    </Text>

                    {/* Waving Flag - only show when timer expires */}
                    {isExpired && (
                        <Animated.View
                            style={[
                                sharedStyles.flagContainer,
                                { transform: [{ rotate: waveRotation }] }
                            ]}
                        >
                            <Text style={sharedStyles.flagText}>🏁</Text>
                        </Animated.View>
                    )}
                </View>

                {/* Next Team Button - only show in teams mode when timer expires */}
                {isTeamsMode && showNextButton && (
                    <View style={sharedStyles.backButtonSection}>
                        <TouchableOpacity
                            style={[
                                sharedStyles.backButton,
                                nextButtonDisabled && { opacity: 0.5 }
                            ]}
                            onPress={handleNextTeam}
                            disabled={nextButtonDisabled}
                        >
                            <Text style={sharedStyles.backButtonText}>Next Team</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Back Button Section */}
                <BackButton navigation={navigation} text="HOME" />
            </View>
        </BorderWrapper>
    );
}