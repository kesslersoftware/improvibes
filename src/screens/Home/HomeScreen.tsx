import React, { useState, useRef, useEffect } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import BorderWrapper from '../../components/BorderWrapper';
import { LOADING, HOME_SCREEN } from '../../styles/Constants';
import { sh } from '../../components/ScreenDimensionUtility';

export default function HomeScreen({ navigation }: any) {
    // Accordion animation values
    const jamAccordionHeight = useRef(new Animated.Value(0)).current;
    const showAccordionHeight = useRef(new Animated.Value(0)).current;

    // State management
    const [isLoading, setIsLoading] = useState(false);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [jamAccordionOpen, setJamAccordionOpen] = useState(false);
    const [showAccordionOpen, setShowAccordionOpen] = useState(false);
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

    // Jam accordion animation
    const toggleJamAccordion = () => {
        if (jamAccordionOpen) {
            // Close accordion
            Animated.timing(jamAccordionHeight, {
                toValue: 0,
                duration: HOME_SCREEN.ACCORDION_DURATION,
                useNativeDriver: false,
            }).start(() => setJamAccordionOpen(false));
        } else {
            // Open accordion
            setJamAccordionOpen(true);
            Animated.timing(jamAccordionHeight, {
                toValue: sh * HOME_SCREEN.SECTION_3_EXPANDED,
                duration: HOME_SCREEN.ACCORDION_DURATION,
                useNativeDriver: false,
            }).start(() => {
                // Pause, then close
                setTimeout(() => {
                    Animated.timing(jamAccordionHeight, {
                        toValue: 0,
                        duration: HOME_SCREEN.ACCORDION_DURATION,
                        useNativeDriver: false,
                    }).start(() => setJamAccordionOpen(false));
                }, HOME_SCREEN.JAM_ACCORDION_PAUSE);
            });
        }
    };

    // Show accordion animation
    const toggleShowAccordion = () => {
        if (showAccordionOpen) {
            // Close accordion
            Animated.timing(showAccordionHeight, {
                toValue: 0,
                duration: HOME_SCREEN.ACCORDION_DURATION,
                useNativeDriver: false,
            }).start(() => setShowAccordionOpen(false));
        } else {
            // Open accordion
            setShowAccordionOpen(true);
            Animated.timing(showAccordionHeight, {
                toValue: sh * HOME_SCREEN.SECTION_5_EXPANDED,
                duration: HOME_SCREEN.ACCORDION_DURATION,
                useNativeDriver: false,
            }).start(() => {
                // Pause, then close
                setTimeout(() => {
                    Animated.timing(showAccordionHeight, {
                        toValue: 0,
                        duration: HOME_SCREEN.ACCORDION_DURATION,
                        useNativeDriver: false,
                    }).start(() => setShowAccordionOpen(false));
                }, HOME_SCREEN.SHOW_ACCORDION_PAUSE);
            });
        }
    };

    const reset = () => {
        setButtonsDisabled(false);
        setIsLoading(false);
    };
    // Handle Jam button press
    const handleJamButtonPress = () => {
        setButtonsDisabled(true);
        setIsLoading(true);
        setTimeout(() => {
            navigation.navigate('Jam');
            reset();
        }, LOADING.LOADING_DELAY);
    };

    // Handle Show button press
    const handleShowButtonPress = () => {
        setButtonsDisabled(true);
        setIsLoading(true);
        setTimeout(() => {
            navigation.navigate('Show');
            reset();
        }, LOADING.LOADING_DELAY);
    };
    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                {/* Section 1: Header text */}
                <View style={sharedStyles.homeSection1}>
                    <Text style={sharedStyles.homeHeaderText}>do you want to...</Text>
                </View>

                {/* Section 2: Jam button */}
                <View style={sharedStyles.homeSection2}>
                    <TouchableOpacity
                        style={sharedStyles.homeButtonOuter}
                        onPress={handleJamButtonPress}
                        disabled={buttonsDisabled}
                    >
                        <View style={sharedStyles.homeButtonInner}>
                            <Text style={sharedStyles.homeButtonText}>start a jam!</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleJamAccordion}>
                        <Text style={sharedStyles.homeLinkText}>what's a Jam?</Text>
                    </TouchableOpacity>
                </View>

                {/* Section 3: Jam accordion */}
                <Animated.View style={[sharedStyles.homeSection3, { height: jamAccordionHeight }]}>
                    <View style={sharedStyles.homeAccordionContainer}>
                        <Text style={sharedStyles.homeAccordionText}>
                            A Jam is a series of improv games and scenes that are sometimes preceded by a series of warmups.
                            Games involve small groups of people, usually 2, 3, or more. Warmups usually involve the entire group.
                        </Text>
                    </View>
                </Animated.View>

                {/* Section 4: Show button */}
                <View style={sharedStyles.homeSection4}>
                    <TouchableOpacity
                        style={sharedStyles.homeButtonOuter}
                        onPress={handleShowButtonPress}
                        disabled={buttonsDisabled}
                    >
                        <View style={sharedStyles.homeButtonInner}>
                            <Text style={sharedStyles.homeButtonText}>start a show!</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleShowAccordion}>
                        <Text style={sharedStyles.homeLinkText}>what's a show?</Text>
                    </TouchableOpacity>
                </View>

                {/* Section 5: Show accordion */}
                <Animated.View style={[sharedStyles.homeSection5, { height: showAccordionHeight }]}>
                    <View style={sharedStyles.homeAccordionContainer}>
                        <Text style={sharedStyles.homeAccordionText}>
                            A show involves teams of improvers that have been regularly practicing with each other. Each team gets
                            to perform a longform set of a certain amount of time; usually the Show time is evenly split between
                            all of the teams that want to perform. Sometimes audience members not on a team can participate in an
                            audience set if any time is left in the show.
                        </Text>
                    </View>
                </Animated.View>

                {/* Section 6: Loading section */}
                <View style={sharedStyles.homeSection6}>
                    {isLoading && (
                        <Text style={sharedStyles.homeLoadingText}>Getting ready{loadingDots}</Text>
                    )}
                </View>
            </View>
        </BorderWrapper>
    );
}