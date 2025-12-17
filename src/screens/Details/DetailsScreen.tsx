import React, { useState } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import BorderWrapper from '../../components/BorderWrapper';
import BackButton from '../../components/BackButton';
import { getRandomWord } from '../../utils/wordUtils';
import { DETAILS_SCREEN } from '../../styles/Constants';

export default function DetailsScreen({ navigation }: any) {

        const [selectedPeople, setSelectedPeople] = useState<number | null>(null);
        const [selectedLength, setSelectedLength] = useState<number | null>(null);
        const [selectedWordType, setSelectedWordType] = useState<string | null>(null);
        const [displayedWord, setDisplayedWord] = useState<string>('');
        const [isLoadingWord, setIsLoadingWord] = useState<boolean>(false);

        const peopleOptions = [2, 3, 4, '5+'];
        const lengthOptions = [2, 3, 5, 10, 12, 15, 20];
        const wordOptions = [
            {id: 'any', label: 'any!'},
            {id: 'nouns', label: 'nouns'},
            {id: 'adjectives', label: 'adjectives'},
            {id: 'adverbs', label: 'adverbs'},
            {id: 'ads_adverbs', label: 'ads &\nadverbs'},
            {id: 'location', label: 'location'},
        ];

        const handleMakeWordPress = async () => {
            if (!selectedWordType || isLoadingWord) return;

            setIsLoadingWord(true);
            setDisplayedWord('...');

            try {
                // Get random word
                const word = await getRandomWord(selectedWordType);

                // Wait for the configured delay
                setTimeout(() => {
                    setDisplayedWord(word);
                    setIsLoadingWord(false);
                }, DETAILS_SCREEN.WORD_DELAY_MS);
            } catch (error) {
                console.error('Error getting word:', error);
                setDisplayedWord('Error');
                setIsLoadingWord(false);
            }
        };

        const handleStartPress = () => {
            if (selectedLength && displayedWord && displayedWord !== '...' && displayedWord !== 'Error') {
                navigation.navigate('Timer', {sceneLength: selectedLength});
            }
        };


        // Check if make word button should be enabled
        const isMakeWordEnabled = selectedWordType !== null && !isLoadingWord;

        // Check if start button should be enabled
        const isStartEnabled = selectedLength !== null && displayedWord !== '' && displayedWord !== '...' && displayedWord !== 'Error';

        return (
            <BorderWrapper>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    {/* Section 1: Number of People */}
                    <View style={sharedStyles.detailsSection1}>
                        {peopleOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    sharedStyles.timeButton,
                                    selectedPeople === option && sharedStyles.timeButtonPressed
                                ]}
                                onPress={() => setSelectedPeople(option as number)}
                            >
                                <Text style={[
                                    sharedStyles.sceneDetailsText,
                                    selectedPeople === option && sharedStyles.timeButtonTextPressed
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <Text style={sharedStyles.sceneDetailsText}> person scene</Text>
                    </View>

                    {/* Section 2: Length of Scene */}
                    <View style={sharedStyles.detailsSection2}>
                        {lengthOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    sharedStyles.timeButton,
                                    selectedLength === option && sharedStyles.timeButtonPressed
                                ]}
                                onPress={() => setSelectedLength(option)}
                            >
                                <Text style={[
                                    sharedStyles.sceneDetailsText,
                                    selectedLength === option && sharedStyles.timeButtonTextPressed
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <Text style={sharedStyles.sceneDetailsText}> minutes</Text>
                    </View>

                    {/* Section 3: Word Choices */}
                    <View style={sharedStyles.detailsSection3}>
                        <Text style={sharedStyles.wordChoiceHeader}>select a word type!</Text>
                        <View style={sharedStyles.wordGridContainer}>
                            {wordOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.id}
                                    style={sharedStyles.wordButtonOuter}
                                    onPress={() => setSelectedWordType(option.id)}
                                >
                                    <View style={[
                                        sharedStyles.wordButtonInner,
                                        selectedWordType === option.id && sharedStyles.wordButtonInnerPressed
                                    ]}>
                                        <Text style={sharedStyles.wordButtonText}>
                                            {option.label}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Section 3b: Make a Word Button */}
                    <View style={sharedStyles.detailsSection3b}>
                        <TouchableOpacity
                            style={[
                                sharedStyles.makeWordButton,
                                !isMakeWordEnabled && sharedStyles.makeWordButtonDisabled
                            ]}
                            onPress={handleMakeWordPress}
                            disabled={!isMakeWordEnabled}
                        >
                            <Text style={sharedStyles.makeWordButtonText}>make a word!</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Section 3c: Word Display */}
                    <View style={sharedStyles.detailsSection3c}>
                        <Text style={sharedStyles.wordDisplayText}>{displayedWord}</Text>
                    </View>

                    {/* Section 6: Start Button */}
                    <View style={sharedStyles.detailsSection6}>
                        <TouchableOpacity
                            style={[
                                sharedStyles.startButton,
                                !isStartEnabled && sharedStyles.startButtonDisabled
                            ]}
                            onPress={handleStartPress}
                            disabled={!isStartEnabled}
                        >
                            <Text style={sharedStyles.startButtonText}>START</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Bottom button: Back to Home */}
                    <BackButton navigation={navigation} text="Back to Home!" />
                </ScrollView>
            </BorderWrapper>
        );
}