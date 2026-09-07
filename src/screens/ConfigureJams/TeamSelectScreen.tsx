import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import { sharedStyles } from '../../styles/SharedStyles';
import WizardFooterButtons from './WizardFooterButtons';
import NumericField from './NumericField';
import { useJamConfigDraft } from './JamConfigDraftContext';
import { calcScenesNeeded, calcTotalTimeForScenes, calcTotalTimeForSets } from '../../utils/jamConfigCalculations';
import { loadShowLineup, Team } from '../../utils/syncService';

export default function TeamSelectScreen({ navigation }: any) {
    const { config, setConfig } = useJamConfigDraft();

    const [availableTeams, setAvailableTeams] = useState<Team[]>([]);
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedTeamName, setSelectedTeamName] = useState<string | null>(null);

    const [teamsConfirmed, setTeamsConfirmed] = useState(config.teamSets.numberOfTeams > 0);
    const [timePerSetConfirmed, setTimePerSetConfirmed] = useState(config.teamSets.perTeamPlannedMinutes > 0);

    useEffect(() => {
        loadShowLineup().then(teams => setAvailableTeams(teams ?? []));
    }, []);

    const performingTeams = config.teamSets.teams;
    const selectableTeams = availableTeams.filter(
        t => !performingTeams.some(p => p.teamName === t.teamName)
    );

    const handleSelectTeam = () => {
        if (!selectedTeamName) return;
        setConfig({
            ...config,
            teamSets: {
                ...config.teamSets,
                teams: [...performingTeams, { teamName: selectedTeamName }],
            },
        });
        setSelectedTeamName(null);
        setAddFormOpen(false);
    };

    const handleAllTeamsSelected = () => {
        setConfig({
            ...config,
            teamSets: { ...config.teamSets, numberOfTeams: performingTeams.length },
        });
        setTeamsConfirmed(true);
    };

    const perTeamPlannedMinutesValid = config.teamSets.perTeamPlannedMinutes > 0;
    const scenesNeeded = calcScenesNeeded(config.estimatedAttendees);
    const totalTimeForScenes = calcTotalTimeForScenes(scenesNeeded, config.timePerScene);
    const totalTimeForSets = calcTotalTimeForSets(config.teamSets.numberOfTeams, config.teamSets.perTeamPlannedMinutes);
    const timeLeftForGames = config.totalMinutes - config.transitionMinutes - totalTimeForSets - totalTimeForScenes;

    const handleTimePerSetSubmit = () => {
        const actualTeamMinutes: Record<string, number> = {};
        performingTeams.forEach(t => {
            actualTeamMinutes[t.teamName] = config.teamSets.perTeamPlannedMinutes;
        });
        setConfig({ ...config, teamSets: { ...config.teamSets, actualTeamMinutes } });
        setTimePerSetConfirmed(true);
    };

    const handleConfigureAggregates = () => {
        setConfig({
            ...config,
            totalMinutes: 0,
            estimatedAttendees: 0,
            transitionMinutes: 0,
            timePerScene: 0,
            teamSets: { numberOfTeams: 0, perTeamPlannedMinutes: 0, teams: [], actualTeamMinutes: {} },
        });
        setTeamsConfirmed(false);
        setTimePerSetConfirmed(false);
        navigation.navigate('ConfigureAggregates');
    };

    return (
        <BorderWrapper>
            <ScrollView contentContainerStyle={sharedStyles.wizardContentContainer}>
                <Text style={sharedStyles.wizardHeaderText}>step 2: teams performing</Text>

                {performingTeams.map(t => (
                    <View key={t.teamName} style={sharedStyles.wizardListRow}>
                        <Text style={sharedStyles.wizardListRowText}>{t.teamName}</Text>
                    </View>
                ))}

                {!addFormOpen && !teamsConfirmed && (
                    <TouchableOpacity style={sharedStyles.wizardButtonOuter} onPress={() => setAddFormOpen(true)}>
                        <View style={sharedStyles.wizardButtonInner}>
                            <Text style={sharedStyles.wizardButtonText}>Add Team</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {addFormOpen && (
                    <>
                        <TouchableOpacity style={sharedStyles.wizardDropdown} onPress={() => setDropdownVisible(true)}>
                            <Text style={sharedStyles.wizardDropdownText}>{selectedTeamName || 'pick a team'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[sharedStyles.wizardButtonOuter, !selectedTeamName && sharedStyles.wizardButtonOuterDisabled]}
                            disabled={!selectedTeamName}
                            onPress={handleSelectTeam}
                        >
                            <View style={sharedStyles.wizardButtonInner}>
                                <Text style={sharedStyles.wizardButtonText}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}

                {performingTeams.length > 0 && !addFormOpen && !teamsConfirmed && (
                    <TouchableOpacity style={sharedStyles.wizardButtonOuter} onPress={handleAllTeamsSelected}>
                        <View style={sharedStyles.wizardButtonInner}>
                            <Text style={sharedStyles.wizardButtonText}>All Teams Have Been Selected</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {teamsConfirmed && (
                    <>
                        <NumericField
                            label="length of each team's set"
                            value={config.teamSets.perTeamPlannedMinutes}
                            onChangeValue={v => setConfig({ ...config, teamSets: { ...config.teamSets, perTeamPlannedMinutes: v } })}
                            min={1}
                            max={60}
                        />
                        <TouchableOpacity
                            style={[sharedStyles.wizardButtonOuter, !perTeamPlannedMinutesValid && sharedStyles.wizardButtonOuterDisabled]}
                            disabled={!perTeamPlannedMinutesValid}
                            onPress={handleTimePerSetSubmit}
                        >
                            <View style={sharedStyles.wizardButtonInner}>
                                <Text style={sharedStyles.wizardButtonText}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}

                {teamsConfirmed && timePerSetConfirmed && (
                    timeLeftForGames < 0 ? (
                        <>
                            <Text style={sharedStyles.wizardErrorText}>
                                Not enough time left for scenes, sets, and transitions. Reconfigure the aggregates.
                            </Text>
                            <TouchableOpacity style={sharedStyles.wizardButtonOuter} onPress={handleConfigureAggregates}>
                                <View style={sharedStyles.wizardButtonInner}>
                                    <Text style={sharedStyles.wizardButtonText}>Configure Aggregates</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity style={sharedStyles.wizardButtonOuter} onPress={() => navigation.navigate('ConfigureSequence')}>
                            <View style={sharedStyles.wizardButtonInner}>
                                <Text style={sharedStyles.wizardButtonText}>Proceed to Sequencing the Jam</Text>
                            </View>
                        </TouchableOpacity>
                    )
                )}

                <WizardFooterButtons navigation={navigation} />

                <Modal
                    visible={dropdownVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setDropdownVisible(false)}
                >
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
                        activeOpacity={1}
                        onPress={() => setDropdownVisible(false)}
                    >
                        <View style={{ backgroundColor: '#ccffff', borderRadius: 10, padding: 20, width: '80%', maxHeight: '60%', borderWidth: 3, borderColor: '#ff3399' }}>
                            <FlatList
                                data={selectableTeams}
                                keyExtractor={item => item.teamName}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ffcc00' }}
                                        onPress={() => { setSelectedTeamName(item.teamName); setDropdownVisible(false); }}
                                    >
                                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#6600cc' }}>{item.teamName}</Text>
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
