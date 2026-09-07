import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { JamConfigDraftProvider } from './JamConfigDraftContext';
import ConfigureAggregatesScreen from './ConfigureAggregatesScreen';
import TeamSelectScreen from './TeamSelectScreen';
import ConfigureSequenceScreen from './ConfigureSequenceScreen';
import FinalConfigurationDetailsScreen from './FinalConfigurationDetailsScreen';

export type JamConfigWizardParamList = {
    ConfigureAggregates: undefined;
    TeamSelect: undefined;
    ConfigureSequence: undefined;
    FinalConfigurationDetails: undefined;
};

const WizardStack = createNativeStackNavigator<JamConfigWizardParamList>();

// Scoping the draft provider to this nested navigator means the in-progress
// JamConfiguration is naturally discarded once the wizard unmounts (Cancel,
// or finishing and returning to Home) — no manual reset-on-exit needed.
export default function JamConfigWizardNavigator({ route }: any) {
    const name = route?.params?.name;

    return (
        <JamConfigDraftProvider name={name}>
            <WizardStack.Navigator
                initialRouteName="ConfigureAggregates"
                screenOptions={{ headerShown: false }}
            >
                <WizardStack.Screen name="ConfigureAggregates" component={ConfigureAggregatesScreen} />
                <WizardStack.Screen name="TeamSelect" component={TeamSelectScreen} />
                <WizardStack.Screen name="ConfigureSequence" component={ConfigureSequenceScreen} />
                <WizardStack.Screen name="FinalConfigurationDetails" component={FinalConfigurationDetailsScreen} />
            </WizardStack.Navigator>
        </JamConfigDraftProvider>
    );
}
