import * as React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';


export default function LoaderComponent({ message, isProgress, progressValue }) {
  return (
    <View
      style={{
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.80)',
      }}>
      <Text
        style={{
          marginBottom: 15,
          fontSize: 18,
          color: '#fff',
          textAlign: 'center',
        }}>
        {message ? message : 'Chargement...'}
      </Text>
      {isProgress ? (
        <ProgressBar
          progress={progressValue}
          color="#0E9CFF"
          style={{ width: 150 }}
        />
      ) : (
        <ActivityIndicator animating={true} color="#0E9CFF" size={40} />
      )}
      <Text
        style={{
          marginTop: 50,
          fontSize: 12,
          color: '#fff',
          textAlign: 'center',
        }}>
        Ne quittez pas l'application svp!
      </Text>
    </View>
  );
}
