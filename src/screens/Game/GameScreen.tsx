import React, { useState, useEffect } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity, Modal, FlatList, ScrollView } from "react-native";
import BorderWrapper from '../../components/BorderWrapper';
import BackButton from '../../components/BackButton';
import { LOADING, GAMES_SCREEN } from '../../styles/Constants';
import gamesData from '../../../assets/games/games.json';

export default function GameScreen({ navigation }: any) {
    // State management
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [gameDetails, setGameDetails] = useState<any>(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingDots, setLoadingDots] = useState('');

    // Extract game names from the JSON
    const gameOptions = gamesData.games.map((game: any) => Object.keys(game)[0]);

    // Loading dots animation
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingDots(prev => {
                    if (prev === '....') return '.';
                    return prev + '.';
                });
            }, 400);
            return () => clearInterval(interval);
        } else {
            setLoadingDots('');
        }
    }, [isLoading]);

    // Handle game selection
    const handleGameSelect = (gameName: string) => {
        setSelectedGame(gameName);
        setDropdownVisible(false);

        // Find the game details
        const gameObj = gamesData.games.find((game: any) => Object.keys(game)[0] === gameName);
        if (gameObj) {
            setGameDetails(gameObj[gameName]);
        }
    };

    const reset = () => {
        setIsLoading(false);
        setGameDetails(null);
        setSelectedGame(null);
    };

    // Handle "let's play!" button press
    const handleLetsPlayPress = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigation.navigate('Details');
            reset();
        }, LOADING.LOADING_DELAY);
    };
    // Handle random game selection
    const handleRandomGame = () => {
        const randomIndex = Math.floor(Math.random() * gameOptions.length);
        const randomGameName = gameOptions[randomIndex];
        handleGameSelect(randomGameName);
    };

    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                {/* Section 1: Header */}
                <View style={sharedStyles.gameSection1}>
                    <Text style={sharedStyles.gameHeaderText}>What game would you like to play?</Text>
                </View>

                {/* Section 2: Dropdown and Random Button */}
                <View style={sharedStyles.gameSection2}>
                    <TouchableOpacity
                        style={sharedStyles.gameDropdown}
                        onPress={() => setDropdownVisible(true)}
                    >
                        <Text style={sharedStyles.gameDropdownText}>
                            {selectedGame || 'pick a game'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sharedStyles.gameRandomButton}
                        onPress={handleRandomGame}
                    >
                        <Text style={sharedStyles.gameRandomButtonText}>random game</Text>
                    </TouchableOpacity>
                </View>

                {/* Sections 3-6: Only show if game is selected */}
                {gameDetails && (
                    <>
                        {/* Section 3: Number of players */}
                        <View style={sharedStyles.gameSection3}>
                            <Text style={sharedStyles.gameInfoText}>
                                number of players: {gameDetails.playerNum}
                            </Text>
                        </View>

                        {/* Section 4: Length of game */}
                        <View style={sharedStyles.gameSection4}>
                            <Text style={sharedStyles.gameInfoText}>
                                length of game: {gameDetails.length}
                            </Text>
                        </View>

                        {/* Section 5: Rules */}
                        <View style={sharedStyles.gameSection5}>
                            <Text style={sharedStyles.gameRulesLabel}>rules of the game...</Text>
                            <View style={sharedStyles.gameRulesContainer}>
                                <ScrollView showsVerticalScrollIndicator={true}>
                                    <Text style={sharedStyles.gameRulesText}>
                                        {gameDetails.rules}
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>

                        {/* Section 6: Let's play button */}
                        <View style={sharedStyles.gameSection6}>
                            <TouchableOpacity
                                style={sharedStyles.gameButtonOuter}
                                onPress={handleLetsPlayPress}
                                disabled={isLoading}
                            >
                                <View style={sharedStyles.gameButtonInner}>
                                    <Text style={sharedStyles.gameButtonText}>let's play!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {/* Section 7: Loading section */}
                <View style={sharedStyles.gameSection7}>
                    {isLoading && (
                        <Text style={sharedStyles.gameLoadingText}>Getting ready{loadingDots}</Text>
                    )}
                </View>

                {/* Bottom button: Back to Jam */}
                <BackButton navigation={navigation} text="Back to Jam!" />

                {/* Dropdown Modal */}
                <Modal
                    visible={dropdownVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setDropdownVisible(false)}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        activeOpacity={1}
                        onPress={() => setDropdownVisible(false)}
                    >
                        <View style={{
                            backgroundColor: '#ccffff',
                            borderRadius: 10,
                            padding: 20,
                            width: '80%',
                            maxHeight: '60%',
                            borderWidth: 3,
                            borderColor: '#ff3399',
                        }}>
                            <FlatList
                                data={gameOptions}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{
                                            padding: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#ffcc00',
                                        }}
                                        onPress={() => handleGameSelect(item)}
                                    >
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '600',
                                            color: '#6600cc',
                                        }}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </BorderWrapper>
    );
}