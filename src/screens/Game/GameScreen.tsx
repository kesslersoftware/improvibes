import React, { useState } from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity, Modal, FlatList, ScrollView } from "react-native";
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import BackButton from '../../components/BackButton';
import gamesData from '../../../assets/games/games.json';

export default function GameScreen({ navigation }: any) {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [gameDetails, setGameDetails] = useState<any>(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const gameOptions = gamesData.games.map((game: any) => Object.keys(game)[0]);

    const handleGameSelect = (gameName: string) => {
        setSelectedGame(gameName);
        setDropdownVisible(false);
        const gameObj = gamesData.games.find((game: any) => Object.keys(game)[0] === gameName);
        if (gameObj) {
            setGameDetails(gameObj[gameName]);
        }
    };

    const handleRandomGame = () => {
        const randomIndex = Math.floor(Math.random() * gameOptions.length);
        handleGameSelect(gameOptions[randomIndex]);
    };

    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                <View style={sharedStyles.gameSection1}>
                    <Text style={sharedStyles.gameHeaderText}>What game would you like to play?</Text>
                </View>

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

                {gameDetails && (
                    <>
                        <View style={sharedStyles.gameSection3}>
                            <Text style={sharedStyles.gameInfoText}>
                                number of players: {gameDetails.playerNum}
                            </Text>
                        </View>

                        <View style={sharedStyles.gameSection4}>
                            <Text style={sharedStyles.gameInfoText}>
                                length of game: {gameDetails.length}
                            </Text>
                        </View>

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

                        <View style={sharedStyles.gameSection6}>
                            <TouchableOpacity
                                style={sharedStyles.gameButtonOuter}
                                onPress={() => navigation.navigate('Details')}
                            >
                                <View style={sharedStyles.gameButtonInner}>
                                    <Text style={sharedStyles.gameButtonText}>let's play!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                <BackButton navigation={navigation} text="Back to Jam!" />

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
