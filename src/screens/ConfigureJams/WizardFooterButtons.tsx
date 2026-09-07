import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../../styles/SharedStyles';
import { useJamConfigDraft } from './JamConfigDraftContext';

interface WizardFooterButtonsProps {
    navigation: any;
    showSave?: boolean;
}

// Cancel discards any in-progress changes (the draft only lives in
// JamConfigDraftProvider's state) and returns to Home. Save writes the
// current draft to disk under its existing name and stays put — renaming
// on save is deferred to a later pass.
export default function WizardFooterButtons({ navigation, showSave = true }: WizardFooterButtonsProps) {
    const { persist } = useJamConfigDraft();

    return (
        <View style={sharedStyles.wizardFooterRow}>
            <TouchableOpacity
                style={sharedStyles.wizardFooterButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={sharedStyles.backButtonText}>Cancel</Text>
            </TouchableOpacity>

            {showSave && (
                <TouchableOpacity
                    style={sharedStyles.wizardFooterButton}
                    onPress={() => persist()}
                >
                    <Text style={sharedStyles.backButtonText}>Save</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
