import React, { useState, useRef } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import { HOME_SCREEN } from '../../styles/Constants';
import { sh } from '../../components/ScreenDimensionUtility';

export default function HomeScreen({ navigation }: any) {
    const jamAccordionHeight = useRef(new Animated.Value(0)).current;
    const showAccordionHeight = useRef(new Animated.Value(0)).current;

    const [jamAccordionOpen, setJamAccordionOpen] = useState(false);
    const [showAccordionOpen, setShowAccordionOpen] = useState(false);

    const toggleJamAccordion = () => {
        if (jamAccordionOpen) {
            Animated.timing(jamAccordionHeight, {
                toValue: 0,
                duration: HOME_SCREEN.ACCORDION_DURATION,
                useNativeDriver: false,
            }).start(() => setJamAccordionOpen(false));
        } else {
            setJamAccordionOpen(true);
            Animated.timing(jamAccordionHeight, {
                toValue: sh * HOME_SCREEN.SECTION_3_EXPANDED,
                duration: HOME_SCREEN.ACCORDION_DURATION,
                useNativeDriver: false,
            }).start(() => {
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

    const toggleShowAccordion = () => {
        if (showAccordionOpen) {
            Animated.timing(showAccordionHeight, {
                toValue: 0,
                duration: HOME_SCREEN.ACCORDION_DURATION,
                useNativeDriver: false,
            }).start(() => setShowAccordionOpen(false));
        } else {
            setShowAccordionOpen(true);
            Animated.timing(showAccordionHeight, {
                toValue: sh * HOME_SCREEN.SECTION_5_EXPANDED,
                duration: HOME_SCREEN.ACCORDION_DURATION,
                useNativeDriver: false,
            }).start(() => {
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

    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                <View style={sharedStyles.homeSection1}>
                    <Text style={sharedStyles.homeHeaderText}>do you want to...</Text>
                </View>

                <View style={sharedStyles.homeSection2}>
                    <TouchableOpacity
                        style={sharedStyles.homeButtonOuter}
                        onPress={() => navigation.navigate('Jam')}
                    >
                        <View style={sharedStyles.homeButtonInner}>
                            <Text style={sharedStyles.homeButtonText}>start a jam!</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleJamAccordion}>
                        <Text style={sharedStyles.homeLinkText}>what's a Jam?</Text>
                    </TouchableOpacity>
                </View>

                <Animated.View style={[sharedStyles.homeSection3, { height: jamAccordionHeight }]}>
                    <View style={sharedStyles.homeAccordionContainer}>
                        <Text style={sharedStyles.homeAccordionText}>
                            A Jam is a series of improv games and scenes that are sometimes preceded by a series of warmups.
                            Games involve small groups of people, usually 2, 3, or more. Warmups usually involve the entire group.
                        </Text>
                    </View>
                </Animated.View>

                <View style={sharedStyles.homeSection4}>
                    <TouchableOpacity
                        style={sharedStyles.homeButtonOuter}
                        onPress={() => navigation.navigate('Show')}
                    >
                        <View style={sharedStyles.homeButtonInner}>
                            <Text style={sharedStyles.homeButtonText}>start a show!</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleShowAccordion}>
                        <Text style={sharedStyles.homeLinkText}>what's a show?</Text>
                    </TouchableOpacity>
                </View>

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
            </View>
        </BorderWrapper>
    );
}
