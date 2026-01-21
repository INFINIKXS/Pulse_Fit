import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../config/theme';

export enum MessageTypes {
    FAIL = 'FAIL',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    DECISION = 'DECISION',
    DANGEROUS_DECISION = 'DANGEROUS_DECISION',
    INFO = 'INFO',
}

interface MessageModalProps {
    visible: boolean;
    messageType: MessageTypes;
    headerText: string;
    messageText: string;
    onDismiss: () => void;
    onProceed?: () => void;
    buttonText?: string;     // Default: "Okay"
    altButtonText?: string;  // Default: "Cancel"
}

export const MessageModal = ({
    visible,
    messageType,
    headerText,
    messageText,
    onDismiss,
    onProceed,
    buttonText = "Okay",
    altButtonText = "Cancel"
}: MessageModalProps) => {

    // 1. Determine Icon & Color
    let iconName = 'information-variant';
    let themeColor = colors.info;

    switch (messageType) {
        case MessageTypes.FAIL:
            iconName = 'close';
            themeColor = colors.fail;
            break;
        case MessageTypes.SUCCESS:
            iconName = 'check';
            themeColor = colors.success;
            break;
        case MessageTypes.WARNING:
            iconName = 'alert-circle-outline';
            themeColor = colors.warning;
            break;
        case MessageTypes.DECISION:
            iconName = 'alert-circle-check-outline';
            themeColor = colors.decision;
            break;
        case MessageTypes.DANGEROUS_DECISION:
            iconName = 'alert-circle-check-outline';
            themeColor = colors.fail; // Red for danger
            break;
        default:
            iconName = 'information-variant';
            themeColor = colors.info;
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <Pressable style={styles.backdrop} onPress={onDismiss}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        {/* FLOATING ICON BADGE */}
                        <View style={[styles.modalIcon, { backgroundColor: themeColor }]}>
                            <MaterialCommunityIcons name={iconName as any} size={75} color={colors.white} />
                        </View>

                        <View style={styles.modalContent}>
                            <Text style={styles.headerText}>{headerText}</Text>
                            <Text style={styles.messageText}>{messageText}</Text>

                            {/* DYNAMIC BUTTON LAYOUT */}
                            {(messageType === MessageTypes.DECISION || messageType === MessageTypes.DANGEROUS_DECISION) ? (
                                <View style={styles.decisionRow}>
                                    <Pressable style={[styles.button, styles.altButton]} onPress={onDismiss}>
                                        <Text style={styles.altButtonText}>{altButtonText}</Text>
                                    </Pressable>
                                    <Pressable style={[styles.button, { backgroundColor: themeColor }]} onPress={onProceed}>
                                        <Text style={styles.buttonText}>{buttonText}</Text>
                                    </Pressable>
                                </View>
                            ) : (
                                <Pressable style={[styles.button, { backgroundColor: themeColor, width: '100%' }]} onPress={onDismiss}>
                                    <Text style={styles.buttonText}>{buttonText}</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
    centeredView: { width: '100%', alignItems: 'center', justifyContent: 'center' },
    modalView: { width: '85%', backgroundColor: colors.modalBackground, borderRadius: 35, paddingTop: 50, paddingBottom: 25, paddingHorizontal: 25, alignItems: 'center', elevation: 5, borderWidth: 1, borderColor: colors.modalBorder },
    modalIcon: { position: 'absolute', top: -50, width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: colors.modalBackground, elevation: 10 },
    modalContent: { width: '100%', alignItems: 'center' },
    headerText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: colors.textLight, textAlign: 'center' },
    messageText: { fontSize: 16, color: colors.textDim, textAlign: 'center', marginBottom: 20 },
    decisionRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    button: { borderRadius: 10, padding: 12, elevation: 2, minWidth: 100, alignItems: 'center' },
    altButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.neutral },
    buttonText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
    altButtonText: { color: colors.neutral, fontWeight: 'bold', fontSize: 16 }
});
