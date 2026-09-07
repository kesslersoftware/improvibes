import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import { sharedStyles } from '../../styles/SharedStyles';
import WizardFooterButtons from './WizardFooterButtons';
import { useJamConfigDraft } from './JamConfigDraftContext';
import { describePlannedItem } from '../../utils/jamConfigCalculations';
import { deleteSavedJam } from '../../utils/syncService';

export default function FinalConfigurationDetailsScreen({ navigation }: any) {
    const { config, configName, persist } = useJamConfigDraft();

    const handleSaveAndExit = async () => {
        await persist();
        navigation.navigate('Home');
    };

    const handleRedoSomething = async () => {
        await persist();
        navigation.navigate('ConfigureAggregates');
    };

    const handleDeleteConfiguration = async () => {
        if (configName) {
            await deleteSavedJam(configName);
        }
        navigation.navigate('Home');
    };

    return (
        <BorderWrapper>
            <ScrollView contentContainerStyle={sharedStyles.wizardContentContainer}>
                <Text style={sharedStyles.wizardHeaderText}>Review Jam Configuration</Text>

                <View style={sharedStyles.wizardSummarySection}>
                    <Text style={sharedStyles.wizardSummaryHeaderText}>Aggregate values chosen</Text>
                    <Text style={sharedStyles.wizardSummaryLine}>Length of jam: {config.totalMinutes} min</Text>
                    <Text style={sharedStyles.wizardSummaryLine}>Estimated attendees: {config.estimatedAttendees}</Text>
                    <Text style={sharedStyles.wizardSummaryLine}>Transition time: {config.transitionMinutes} min</Text>
                    <Text style={sharedStyles.wizardSummaryLine}>Length of scene: {config.timePerScene} min</Text>
                    <Text style={sharedStyles.wizardSummaryLine}>Length of each set: {config.teamSets.perTeamPlannedMinutes} min</Text>
                </View>

                <View style={sharedStyles.wizardSummarySection}>
                    <Text style={sharedStyles.wizardSummaryHeaderText}>Teams performing</Text>
                    {config.teamSets.teams.map(t => (
                        <Text key={t.teamName} style={sharedStyles.wizardSummaryLine}>{t.teamName}</Text>
                    ))}
                </View>

                <View style={sharedStyles.wizardSummarySection}>
                    <Text style={sharedStyles.wizardSummaryHeaderText}>Jam sequence</Text>
                    {config.order.map((item, index) => (
                        <Text key={index} style={sharedStyles.wizardSummaryLine}>
                            {describePlannedItem(item)} — {item.minutes} min
                        </Text>
                    ))}
                </View>

                <TouchableOpacity style={sharedStyles.wizardButtonOuter} onPress={handleSaveAndExit}>
                    <View style={sharedStyles.wizardButtonInner}>
                        <Text style={sharedStyles.wizardButtonText}>Save and Exit</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={sharedStyles.wizardButtonOuter} onPress={handleRedoSomething}>
                    <View style={sharedStyles.wizardButtonInner}>
                        <Text style={sharedStyles.wizardButtonText}>Redo Something</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={sharedStyles.wizardButtonOuter} onPress={handleDeleteConfiguration}>
                    <View style={sharedStyles.wizardButtonInner}>
                        <Text style={sharedStyles.wizardButtonText}>Delete Configuration</Text>
                    </View>
                </TouchableOpacity>

                <WizardFooterButtons navigation={navigation} showSave={false} />
            </ScrollView>
        </BorderWrapper>
    );
}
