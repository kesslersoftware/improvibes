import { sharedStyles } from '../../styles/SharedStyles';
import {View, Text, TouchableOpacity} from "react-native";
import {DrawerActions, useNavigation} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../styles/Constants';
import { sh } from '../ScreenDimensionUtility';
import {RootStackParamList} from "../../../App.tsx";

interface HeaderBarProps {
    display?: boolean;
}
export default function HeaderBar({ display = true }: HeaderBarProps) {
    const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
    return (
        <View style={sharedStyles.headerBar}>
            {display && (
                <TouchableOpacity
                    style={sharedStyles.hamburgerButton}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                    <Ionicons name="menu" size={sh * 0.028 * 2} color={COLORS.BODY_TEXT_DARK} />
                </TouchableOpacity>
            )}
            <Text style={sharedStyles.titleText}>BoycottPro</Text>
        </View>
    );
}
