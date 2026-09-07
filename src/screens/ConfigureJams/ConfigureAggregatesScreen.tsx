import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import { sharedStyles } from '../../styles/SharedStyles';
import WizardFooterButtons from './WizardFooterButtons';
import NumericField from './NumericField';
import { useJamConfigDraft } from './JamConfigDraftContext';
import { calcScenesNeeded, calcTotalTimeForScenes } from '../../utils/jamConfigCalculations';

// Split out so its local "confirmed" state only initializes once the draft
// has actually finished loading (see the `ready` gate below) — otherwise a
// resumed config's fields would render before they're populated.
function AggregatesForm({ navigation }: any) {
    const { config, setConfig } = useJamConfigDraft();

    const [aggregatesConfirmed, setAggregatesConfirmed] = useState(
        config.totalMinutes > 0 && config.estimatedAttendees > 0 && config.transitionMinutes > 0
    );
    const [sceneLengthConfirmed, setSceneLengthConfirmed] = useState(config.timePerScene > 0);

    const aggregatesValid = config.totalMinutes > 0 && config.estimatedAttendees > 0 && config.transitionMinutes > 0;
    const sceneLengthValid = config.timePerScene > 0;

    const scenesNeeded = calcScenesNeeded(config.estimatedAttendees);
    const totalTimeForScenes = calcTotalTimeForScenes(scenesNeeded, config.timePerScene);
    const timeLeftAfterScenes = config.totalMinutes - config.transitionMinutes - totalTimeForScenes;

    const handleRedoAggregates = () => {
        setConfig({
            ...config,
            totalMinutes: 0,
            estimatedAttendees: 0,
            transitionMinutes: 0,
            timePerScene: 0,
        });
        setAggregatesConfirmed(false);
        setSceneLengthConfirmed(false);
    };

    return (
        <ScrollView contentContainerStyle={sharedStyles.wizardContentContainer}>
            <Text style={sharedStyles.wizardHeaderText}>step 1: configure aggregates</Text>

            <NumericField
                label="length of jam"
                value={config.totalMinutes}
                onChangeValue={v => setConfig({ ...config, totalMinutes: v })}
                min={1}
                max={180}
            />
            <NumericField
                label="estimated attendees"
                value={config.estimatedAttendees}
                onChangeValue={v => setConfig({ ...config, estimatedAttendees: v })}
                min={1}
                max={50}
            />
            <NumericField
                label="average time for transitions"
                value={config.transitionMinutes}
                onChangeValue={v => setConfig({ ...config, transitionMinutes: v })}
                min={1}
                max={3}
            />

            <TouchableOpacity
                style={[sharedStyles.wizardButtonOuter, !aggregatesValid && sharedStyles.wizardButtonOuterDisabled]}
                disabled={!aggregatesValid}
                onPress={() => setAggregatesConfirmed(true)}
            >
                <View style={sharedStyles.wizardButtonInner}>
                    <Text style={sharedStyles.wizardButtonText}>Submit</Text>
                </View>
            </TouchableOpacity>

            {aggregatesConfirmed && (
                <>
                    <Text style={sharedStyles.wizardSubHeaderText}>scenes needed: {scenesNeeded}</Text>

                    <NumericField
                        label="length of scene"
                        value={config.timePerScene}
                        onChangeValue={v => setConfig({ ...config, timePerScene: v })}
                        min={2}
                        max={5}
                    />

                    <TouchableOpacity
                        style={[sharedStyles.wizardButtonOuter, !sceneLengthValid && sharedStyles.wizardButtonOuterDisabled]}
                        disabled={!sceneLengthValid}
                        onPress={() => setSceneLengthConfirmed(true)}
                    >
                        <View style={sharedStyles.wizardButtonInner}>
                            <Text style={sharedStyles.wizardButtonText}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </>
            )}

            {aggregatesConfirmed && sceneLengthConfirmed && (
                timeLeftAfterScenes <= 0 ? (
                    <>
                        <Text style={sharedStyles.wizardErrorText}>
                            Not enough time for {scenesNeeded} scenes at {config.timePerScene} minutes each, after transitions. Reduce attendees, increase jam length, or shorten scenes.
                        </Text>
                        <TouchableOpacity style={sharedStyles.wizardButtonOuter} onPress={handleRedoAggregates}>
                            <View style={sharedStyles.wizardButtonInner}>
                                <Text style={sharedStyles.wizardButtonText}>Redo Aggregates</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        style={sharedStyles.wizardButtonOuter}
                        onPress={() => navigation.navigate('TeamSelect')}
                    >
                        <View style={sharedStyles.wizardButtonInner}>
                            <Text style={sharedStyles.wizardButtonText}>Proceed to Team Selection</Text>
                        </View>
                    </TouchableOpacity>
                )
            )}

            <WizardFooterButtons navigation={navigation} />
        </ScrollView>
    );
}

export default function ConfigureAggregatesScreen({ navigation }: any) {
    const { ready } = useJamConfigDraft();

    return (
        <BorderWrapper>
            {ready ? (
                <AggregatesForm navigation={navigation} />
            ) : (
                <View style={sharedStyles.startScreenContainer}>
                    <Text style={sharedStyles.jamLoadingText}>Loading...</Text>
                </View>
            )}
        </BorderWrapper>
    );
}
