import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import { sharedStyles } from '../../styles/SharedStyles';
import WizardFooterButtons from './WizardFooterButtons';
import NumericField from './NumericField';
import { useJamConfigDraft } from './JamConfigDraftContext';
import {
    calcScenesRemaining,
    calcTimeLeftForGames,
    calcNextTeamToSchedule,
    describePlannedItem,
} from '../../utils/jamConfigCalculations';
import { loadOurGames, Game } from '../../utils/syncService';
import { PlannedItem } from '../../models/JamConfiguration';

export default function ConfigureSequenceScreen({ navigation }: any) {
    const { config, setConfig } = useJamConfigDraft();

    const [games, setGames] = useState<Game[]>([]);
    const [gameFormOpen, setGameFormOpen] = useState(false);
    const [gameDropdownVisible, setGameDropdownVisible] = useState(false);
    const [selectedGameName, setSelectedGameName] = useState<string | null>(null);
    const [selectedGameMinutes, setSelectedGameMinutes] = useState(0);

    useEffect(() => {
        loadOurGames().then(g => setGames(g ?? []));
    }, []);

    const scenesRemaining = calcScenesRemaining(config);
    const timeLeftForGames = calcTimeLeftForGames(config);
    const nextTeam = calcNextTeamToSchedule(config);

    const canAddScene = scenesRemaining > 0 || timeLeftForGames >= config.timePerScene;
    const canAddSet = !!nextTeam;
    const maxGameMinutes = Math.max(timeLeftForGames, 0);
    const canAddGame = maxGameMinutes >= 2;

    const canFinish = scenesRemaining <= 0 && !nextTeam;

    const updateOrder = (order: PlannedItem[]) => setConfig({ ...config, order });

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const order = [...config.order];
        [order[index - 1], order[index]] = [order[index], order[index - 1]];
        updateOrder(order);
    };

    const handleMoveDown = (index: number) => {
        if (index === config.order.length - 1) return;
        const order = [...config.order];
        [order[index], order[index + 1]] = [order[index + 1], order[index]];
        updateOrder(order);
    };

    const handleDelete = (index: number) => {
        updateOrder(config.order.filter((_, i) => i !== index));
    };

    const handleAddScene = () => {
        if (!canAddScene) return;
        updateOrder([...config.order, { kind: 'scene', minutes: config.timePerScene }]);
    };

    const handleAddSet = () => {
        if (!nextTeam) return;
        updateOrder([...config.order, { kind: 'set', teamName: nextTeam, minutes: config.teamSets.perTeamPlannedMinutes }]);
    };

    const handleConfirmAddGame = () => {
        if (!selectedGameName || selectedGameMinutes <= 0) return;
        updateOrder([...config.order, { kind: 'game', gameName: selectedGameName, minutes: selectedGameMinutes }]);
        setSelectedGameName(null);
        setSelectedGameMinutes(0);
        setGameFormOpen(false);
    };

    const handleFinishConfiguration = () => {
        updateOrder([...config.order, { kind: 'mashup', minutes: Math.max(timeLeftForGames, 0) }]);
        navigation.navigate('FinalConfigurationDetails');
    };

    return (
        <BorderWrapper>
            <ScrollView contentContainerStyle={sharedStyles.wizardContentContainer}>
                <Text style={sharedStyles.wizardSubHeaderText}>time left for games = {timeLeftForGames}</Text>
                <Text style={sharedStyles.wizardSubHeaderText}>scenes left to schedule = {Math.max(scenesRemaining, 0)}</Text>

                {config.order.map((item, index) => (
                    <View key={index} style={sharedStyles.wizardListRow}>
                        <Text style={sharedStyles.wizardListRowText}>{describePlannedItem(item)}</Text>
                        <Text style={sharedStyles.wizardListRowMinutes}>{item.minutes}m</Text>

                        <TouchableOpacity
                            style={[sharedStyles.wizardIconButton, index === 0 && sharedStyles.wizardIconButtonDisabled]}
                            disabled={index === 0}
                            onPress={() => handleMoveUp(index)}
                        >
                            <Text style={sharedStyles.wizardIconText}>▲</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[sharedStyles.wizardIconButton, index === config.order.length - 1 && sharedStyles.wizardIconButtonDisabled]}
                            disabled={index === config.order.length - 1}
                            onPress={() => handleMoveDown(index)}
                        >
                            <Text style={sharedStyles.wizardIconText}>▼</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={sharedStyles.wizardIconButton} onPress={() => handleDelete(index)}>
                            <Text style={sharedStyles.wizardIconText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {!gameFormOpen && (
                    <View style={sharedStyles.wizardButtonGroupRow}>
                        <TouchableOpacity
                            style={[sharedStyles.wizardSmallButton, !canAddScene && sharedStyles.wizardSmallButtonDisabled]}
                            disabled={!canAddScene}
                            onPress={handleAddScene}
                        >
                            <Text style={sharedStyles.wizardSmallButtonText}>Add Scene</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[sharedStyles.wizardSmallButton, !canAddSet && sharedStyles.wizardSmallButtonDisabled]}
                            disabled={!canAddSet}
                            onPress={handleAddSet}
                        >
                            <Text style={sharedStyles.wizardSmallButtonText}>Add Set</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[sharedStyles.wizardSmallButton, !canAddGame && sharedStyles.wizardSmallButtonDisabled]}
                            disabled={!canAddGame}
                            onPress={() => setGameFormOpen(true)}
                        >
                            <Text style={sharedStyles.wizardSmallButtonText}>Add Game</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {gameFormOpen && (
                    <>
                        <TouchableOpacity style={sharedStyles.wizardDropdown} onPress={() => setGameDropdownVisible(true)}>
                            <Text style={sharedStyles.wizardDropdownText}>{selectedGameName || 'pick a game'}</Text>
                        </TouchableOpacity>

                        <NumericField
                            label="game length"
                            value={selectedGameMinutes}
                            onChangeValue={setSelectedGameMinutes}
                            min={2}
                            max={maxGameMinutes}
                        />

                        <TouchableOpacity
                            style={[
                                sharedStyles.wizardButtonOuter,
                                (!selectedGameName || selectedGameMinutes <= 0) && sharedStyles.wizardButtonOuterDisabled,
                            ]}
                            disabled={!selectedGameName || selectedGameMinutes <= 0}
                            onPress={handleConfirmAddGame}
                        >
                            <View style={sharedStyles.wizardButtonInner}>
                                <Text style={sharedStyles.wizardButtonText}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}

                {canFinish && (
                    <TouchableOpacity style={sharedStyles.wizardButtonOuter} onPress={handleFinishConfiguration}>
                        <View style={sharedStyles.wizardButtonInner}>
                            <Text style={sharedStyles.wizardButtonText}>Finish Configuration</Text>
                        </View>
                    </TouchableOpacity>
                )}

                <WizardFooterButtons navigation={navigation} />

                <Modal
                    visible={gameDropdownVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setGameDropdownVisible(false)}
                >
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
                        activeOpacity={1}
                        onPress={() => setGameDropdownVisible(false)}
                    >
                        <View style={{ backgroundColor: '#ccffff', borderRadius: 10, padding: 20, width: '80%', maxHeight: '60%', borderWidth: 3, borderColor: '#ff3399' }}>
                            <FlatList
                                data={games}
                                keyExtractor={item => item.name}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ffcc00' }}
                                        onPress={() => { setSelectedGameName(item.name); setGameDropdownVisible(false); }}
                                    >
                                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#6600cc' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </ScrollView>
        </BorderWrapper>
    );
}
