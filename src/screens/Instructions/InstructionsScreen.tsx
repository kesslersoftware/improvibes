import { INSTRUCTIONS_SCREEN } from '../../styles/Constants';
import BorderWrapper from "../../components/BorderWrapper/BorderWrapper.tsx";
import {sharedStyles} from "../../styles/SharedStyles";
import {View} from "react-native";
import BackButton from "../../components/BackButton.tsx";
import React from "react";

export default function InstructionsScreen({ navigation }: any) {
    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                {/* Bottom button: Back to Home */}
                <BackButton navigation={navigation} text="Back" />
            </View>
        </BorderWrapper>
    );
}