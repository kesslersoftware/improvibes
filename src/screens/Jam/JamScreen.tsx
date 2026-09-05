import React from 'react';
import { sharedStyles } from "../../styles/SharedStyles";
import { View, Text, TouchableOpacity } from "react-native";
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import BackButton from '../../components/BackButton';

export default function JamScreen({ navigation }: any) {
    return (
        <BorderWrapper>
            <View style={sharedStyles.startScreenContainer}>
                <View style={sharedStyles.jamSection1}>
                    <Text style={sharedStyles.jamHeaderText}>Let's Jam!</Text>
                </View>

                <View style={sharedStyles.jamSection2}>
                    <TouchableOpacity
                        style={sharedStyles.jamButtonOuter}
                        onPress={() => navigation.navigate('Warmups')}
                    >
                        <View style={sharedStyles.jamButtonInner}>
                            <Text style={sharedStyles.jamButtonText}>Let's do Warmups!</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={sharedStyles.jamSection3}>
                    <TouchableOpacity
                        style={sharedStyles.jamButtonOuter}
                        onPress={() => navigation.navigate('Game')}
                    >
                        <View style={sharedStyles.jamButtonInner}>
                            <Text style={sharedStyles.jamButtonText}>Let's play Games!</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <BackButton navigation={navigation} text="Back to Home!" />
            </View>
        </BorderWrapper>
    );
}
