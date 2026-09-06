import BorderWrapper from "../../components/BorderWrapper/BorderWrapper.tsx";
import {sharedStyles} from "../../styles/SharedStyles";
import {View} from "react-native";
import BackButton from "../../components/BackButton.tsx";
import React, {useEffect, useState} from "react";
import {loadSavedJam, saveJam} from "../../utils/syncService";
import {JamConfiguration} from "../../models/JamConfiguration";

function buildBlankConfiguration(): JamConfiguration {
    return {
        totalMinutes: 0,
        transitionMinutes: 0,
        estimatedAttendees: 0,
        timePerScene: 0,
        endsWithMashup: false,
        teamSets: {
            numberOfTeams: 0,
            perTeamPlannedMinutes: 0,
            teams: [],
            actualTeamMinutes: {},
        },
        order: [],
    };
}

function buildNewJamName(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const hours24 = now.getHours();
    const hour12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const meridiem = hours24 < 12 ? 'AM' : 'PM';
    return `improvibes-jam-${month}-${day}-${year}-${hour12}-${minutes}-${meridiem}`;
}

export default function EditJamConfigurationScreen({ navigation, route }: any) {
    const name = route?.params?.name;
    const [configName, setConfigName] = useState<string | undefined>(name);

    useEffect(() => {
        if (name) {
            loadSavedJam(name).then(() => {
                // TODO: populate editing state once the edit UI is built
            });
        } else {
            const newName = buildNewJamName();
            saveJam(newName, buildBlankConfiguration()).then(() => {
                setConfigName(newName);
            });
        }
    }, [name]);

    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
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
