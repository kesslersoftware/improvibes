import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { sharedStyles } from '../../styles/SharedStyles';

interface NumericFieldProps {
    label: string;
    value: number;
    onChangeValue: (value: number) => void;
    min: number;
    max: number;
}

// A value of 0 means "unset" — every field on the wizard has a min of at
// least 1, so 0 can never be a legitimately submitted value.
export default function NumericField({ label, value, onChangeValue, min, max }: NumericFieldProps) {
    const [text, setText] = useState(value > 0 ? String(value) : '');

    const handleChangeText = (raw: string) => {
        const digitsOnly = raw.replace(/[^0-9]/g, '');
        setText(digitsOnly);

        const parsed = parseInt(digitsOnly, 10);
        if (!isNaN(parsed) && parsed >= min && parsed <= max) {
            onChangeValue(parsed);
        } else {
            onChangeValue(0);
        }
    };

    return (
        <View style={sharedStyles.wizardFieldContainer}>
            <Text style={sharedStyles.wizardFieldLabel}>{label} ({min}-{max})</Text>
            <TextInput
                style={sharedStyles.wizardFieldInput}
                keyboardType="number-pad"
                value={text}
                onChangeText={handleChangeText}
                maxLength={String(max).length}
            />
        </View>
    );
}
