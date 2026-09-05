import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import BorderWrapper from '../../components/BorderWrapper/BorderWrapper.tsx';
import { sharedStyles} from "../../styles/SharedStyles";
import { sh } from '../../components/ScreenDimensionUtility';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
    navigation: NavigationProp;
}

export default function StartScreen({ navigation }: Props) {
    return (
        <BorderWrapper showHamburger={false}>
            <View style={[sharedStyles.startScreenContainer, { justifyContent: 'flex-start', paddingTop: sh * 0.08 }]}>
                <View style={sharedStyles.welcomeMessageContainer}>
                    <Text style={[sharedStyles.welcomeWord, { transform: [{ rotate: '-3deg' }] }]}>
                        Welcome
                    </Text>
                    <Text style={[sharedStyles.welcomeWord, { transform: [{ rotate: '-1deg' }] }]}>
                        To
                    </Text>
                    <Text style={[sharedStyles.welcomeWordName, { transform: [{ rotate: '2deg' }] }]}>
                        ImprovLab!
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.replace('Home')}
                    activeOpacity={0.8}
                >
                    <View style={sharedStyles.buttonOuterBorder}>
                        <View style={sharedStyles.buttonInnerBorder}>
                            <View style={sharedStyles.buttonContent}>
                                <Text style={sharedStyles.buttonText}>Let's Go!</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </BorderWrapper>
    );
}