import React from 'react';
import QRCode from 'react-native-qrcode-svg';

export default function QrCode({ size = 120, color="black" }) {
  return (
    <QRCode
      value="https://www.example.com"
      size={size}
      color={color}
    />
  );
}
