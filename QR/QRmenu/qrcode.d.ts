    // src/qrcode.d.ts
    declare module 'react-native-qrcode-svg' {
        import React from 'react';
    
        export interface QRCodeProps {
        value: string;
        size?: number;
        color?: string;
        backgroundColor?: string;
        }
    
        const QRCode: React.FC<QRCodeProps>;
    
        export default QRCode;
    }
    