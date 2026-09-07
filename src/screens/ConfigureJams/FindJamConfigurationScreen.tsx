import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, ScrollView } from "react-native";
import BorderWrapper from "../../components/BorderWrapper/BorderWrapper.tsx";
import BackButton from "../../components/BackButton.tsx";
import { sharedStyles } from "../../styles/SharedStyles";
import { listSavedJams, deleteSavedJam, renameSavedJam } from "../../utils/syncService";

export default function FindJamConfigurationScreen({ navigation, route }: any) {
    const mode: 'use' | 'delete_rename' = route?.params?.mode ?? 'use';

    const [savedJams, setSavedJams] = useState<string[]>([]);
    const [selectedJam, setSelectedJam] = useState<string | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [renameFormOpen, setRenameFormOpen] = useState(false);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        listSavedJams().then(setSavedJams);
    }, []);

    const handleUseThisJam = () => {
        if (!selectedJam) return;
        navigation.navigate('JamConfigWizard', { name: selectedJam });
    };

    const handleDeleteThisJam = () => {
        if (!selectedJam) return;
        deleteSavedJam(selectedJam).then(() => navigation.navigate('Home'));
    };

    const handleOpenRenameForm = () => {
        if (!selectedJam) return;
        setNewName(selectedJam);
        setRenameFormOpen(true);
    };

    const handleSaveRename = () => {
        if (!selectedJam || !newName.trim()) return;
        renameSavedJam(selectedJam, newName.trim()).then(() => navigation.navigate('Home'));
    };

    return (
        <BorderWrapper>
            <ScrollView contentContainerStyle={sharedStyles.wizardContentContainer} keyboardShouldPersistTaps="handled">
                <View style={sharedStyles.findJamSection1}>
                    <Text style={sharedStyles.findJamHeaderText}>Find a Jam Configuration</Text>
                </View>

                <View style={sharedStyles.findJamSection2}>
                    <TouchableOpacity
                        style={sharedStyles.findJamDropdown}
                        onPress={() => setDropdownVisible(true)}
                    >
                        <Text style={sharedStyles.findJamDropdownText}>
                            {selectedJam || 'pick a saved jam'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {mode === 'use' && (
                    <View style={sharedStyles.findJamSection3}>
                        <TouchableOpacity
                            style={sharedStyles.findJamButtonOuter}
                            onPress={handleUseThisJam}
                        >
                            <View style={sharedStyles.findJamButtonInner}>
                                <Text style={sharedStyles.findJamButtonText}>Use This Jam</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                {mode === 'delete_rename' && !renameFormOpen && (
                    <>
                        <TouchableOpacity
                            style={sharedStyles.findJamButtonOuter}
                            onPress={handleDeleteThisJam}
                        >
                            <View style={sharedStyles.findJamButtonInner}>
                                <Text style={sharedStyles.findJamButtonText}>Delete This Jam</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={sharedStyles.findJamButtonOuter}
                            onPress={handleOpenRenameForm}
                        >
                            <View style={sharedStyles.findJamButtonInner}>
                                <Text style={sharedStyles.findJamButtonText}>Rename This Jam</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}

                {mode === 'delete_rename' && renameFormOpen && (
                    <>
                        <View style={sharedStyles.wizardFieldContainer}>
                            <Text style={sharedStyles.wizardFieldLabel}>new name</Text>
                            <TextInput
                                style={sharedStyles.wizardFieldInput}
                                value={newName}
                                onChangeText={setNewName}
                            />
                        </View>

                        <TouchableOpacity
                            style={sharedStyles.findJamButtonOuter}
                            onPress={handleSaveRename}
                        >
                            <View style={sharedStyles.findJamButtonInner}>
                                <Text style={sharedStyles.findJamButtonText}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}

                <BackButton
                    navigation={navigation}
                    text="Cancel"
                    onPress={() => navigation.navigate('Home')}
                />

                <Modal
                    visible={dropdownVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setDropdownVisible(false)}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        activeOpacity={1}
                        onPress={() => setDropdownVisible(false)}
                    >
                        <View style={{
                            backgroundColor: '#ccffff',
                            borderRadius: 10,
                            padding: 20,
                            width: '80%',
                            maxHeight: '60%',
                            borderWidth: 3,
                            borderColor: '#ff3399',
                        }}>
                            <FlatList
                                data={savedJams}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{
                                            padding: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#ffcc00',
                                        }}
                                        onPress={() => {
                                            setSelectedJam(item);
                                            setRenameFormOpen(false);
                                            setDropdownVisible(false);
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '600',
                                            color: '#6600cc',
                                        }}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </ScrollView>
        </BorderWrapper>
    );
}
