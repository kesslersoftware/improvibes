import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { sharedStyles } from '../../styles/SharedStyles';
import { RootStackParamList } from '../../../App';
import {
    HOME_SWITCH,
    ABOUT_US_SWITCH,
    INSTRUCTIONS_SWITCH,
    COLORS_SWITCH,
    CONFIGURE_JAMS_SWITCH,
} from "../../styles/Constants";
import { syncAll } from '../../utils/syncService';

export interface HamburgerProps {
    navigation: NativeStackNavigationProp<RootStackParamList>;
    onClose: () => void;
}

interface MenuItem {
    label: string;
    screen: keyof RootStackParamList;
    enabled: boolean;
}

type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

const Hamburger = ({ navigation, onClose }: HamburgerProps) => {
    const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const menuItems: MenuItem[] = [
        { label: 'Home', screen: 'Home', enabled: HOME_SWITCH },
        { label: 'About Us', screen: 'About', enabled: ABOUT_US_SWITCH },
        { label: 'Instructions', screen: 'Instructions', enabled: INSTRUCTIONS_SWITCH },
        { label: 'Color Scheme', screen: 'Colors', enabled: COLORS_SWITCH },
        { label: 'Configure Jams', screen: 'ConfigureJams', enabled: CONFIGURE_JAMS_SWITCH },
    ];

    const handleNavigate = (screen: keyof RootStackParamList) => {
        navigation.navigate(screen as never);
        onClose();
    };

    const handleSync = async () => {
        console.log('[Hamburger] Sync Data tapped');
        setSyncStatus('syncing');
        setSyncMessage('');
        const results = await syncAll();
        console.log('[Hamburger] syncAll results:', JSON.stringify(results));
        const failed = Object.entries(results).filter(([, r]) => !r.success);
        if (failed.length === 0) {
            const total = Object.values(results).reduce((sum, r) => sum + (r.count ?? 0), 0);
            setSyncStatus('success');
            setSyncMessage(`Synced ${total} records`);
        } else {
            setSyncStatus('error');
            setSyncMessage(failed.map(([tab, r]) => `${tab}: ${r.error}`).join('\n'));
        }
    };

    const syncLabel = {
        idle:    'Sync Data',
        syncing: 'Syncing...',
        success: `✓ ${syncMessage}`,
        error:   `✗ Sync failed`,
    }[syncStatus];

    const syncColor = {
        idle:    '#6600cc',
        syncing: '#999',
        success: '#007700',
        error:   '#cc0000',
    }[syncStatus];

    return (
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={[sharedStyles.hamburgerContainer, { flex: 0, width: '70%' }]}>
                <View style={sharedStyles.hamburgerHeader}>
                    <Text style={sharedStyles.hamburgerHeaderText}>Menu</Text>
                </View>
                <ScrollView style={sharedStyles.hamburgerMenuContainer}>
                    {menuItems
                        .filter((item) => item.enabled)
                        .map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={sharedStyles.hamburgerMenuItem}
                                onPress={() => handleNavigate(item.screen)}
                            >
                                <Text style={sharedStyles.hamburgerMenuItemText}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}

                    <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', marginTop: 8, paddingTop: 8 }}>
                        <TouchableOpacity
                            style={sharedStyles.hamburgerMenuItem}
                            onPress={handleSync}
                            disabled={syncStatus === 'syncing'}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                {syncStatus === 'syncing' && (
                                    <ActivityIndicator size="small" color="#999" />
                                )}
                                <Text style={[sharedStyles.hamburgerMenuItemText, { color: syncColor }]}>
                                    {syncLabel}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {syncStatus === 'error' && (
                            <Text style={{ fontSize: 11, color: '#cc0000', paddingHorizontal: 16, paddingBottom: 8 }}>
                                {syncMessage}
                            </Text>
                        )}
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={onClose}
            />
        </View>
    );
};

export default Hamburger;
