import BorderWrapper from "../../components/BorderWrapper/BorderWrapper.tsx";
import {sharedStyles} from "../../styles/SharedStyles";
import {View, Text, TouchableOpacity} from "react-native";
import BackButton from "../../components/BackButton.tsx";
import React, {useEffect, useState} from "react";
import {listSavedJams, syncAll} from "../../utils/syncService";

export default function ConfigureJamsScreen({ navigation }: any) {
    const [hasSavedJams, setHasSavedJams] = useState(false);

    useEffect(() => {
        syncAll();
        listSavedJams().then(jams => setHasSavedJams(jams.length > 0));
    }, []);

    const handleStartNew = () => {
        navigation.navigate('JamConfigWizard', {});
    };

    const handleLoadExisting = () => {
        navigation.navigate('FindJamConfiguration');
    };

    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                <View style={sharedStyles.configureJamsSection1}>
                    <Text style={sharedStyles.configureJamsHeaderText}>Configure a Jam</Text>
                </View>

                <View style={sharedStyles.configureJamsSection2}>
                    <TouchableOpacity style={sharedStyles.configureJamsButtonOuter} onPress={handleStartNew}>
                        <View style={sharedStyles.configureJamsButtonInner}>
                            <Text style={sharedStyles.configureJamsButtonText}>Start New Jam</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {hasSavedJams && (
                    <View style={sharedStyles.configureJamsSection3}>
                        <TouchableOpacity style={sharedStyles.configureJamsButtonOuter} onPress={handleLoadExisting}>
                            <View style={sharedStyles.configureJamsButtonInner}>
                                <Text style={sharedStyles.configureJamsButtonText}>Load Saved Jam</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Discards any in-progress changes and returns to Home (not just goBack) */}
                <BackButton
                    navigation={navigation}
                    text="Cancel"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </BorderWrapper>
    );
}
