import React from 'react';
import { View } from 'react-native';
import { sharedStyles } from '../../styles/SharedStyles';
import HeaderBar from "../headerBar/HeaderBar.tsx";

interface BorderWrapperProps {
  children: React.ReactNode;
  showHamburger?: boolean;
}

export default function BorderWrapper({ children, showHamburger = true }: BorderWrapperProps) {
  return (
      <View style={{ flex: 1 }}>
        <HeaderBar display={showHamburger}/>
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
