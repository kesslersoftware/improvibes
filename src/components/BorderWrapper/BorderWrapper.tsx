import React from 'react';
import { View } from 'react-native';
import { sharedStyles } from '../../styles/SharedStyles';
import HeaderBar from "../headerBar/HeaderBar.tsx";

interface BorderWrapperProps {
  children: React.ReactNode;
}

export default function BorderWrapper({ children }: BorderWrapperProps) {
  return (
      <View>
        <HeaderBar/>
        <View style={sharedStyles.outerBorder}>
          <View style={sharedStyles.innerBorder}>
            <View style={sharedStyles.mainContent}>
              {children}
            </View>
          </View>
        </View>
      </View>
  );
}
