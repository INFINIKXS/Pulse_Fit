---
name: react-native-custom-modals
description: Implements a reusable, state-driven modal system for React Native. Use this to create consistent Success, Fail, Warning, Info, and Decision popups that replace standard native alerts.
---

# React Native Custom Modals

This skill defines the architecture for a "Floating Icon" modal system. It replaces native `Alert.alert()` with a unified component that changes its appearance (color and icon) based on the message type.

## When to use this skill

- When the user asks for "Custom Alerts", "Popups", or "Feedback Modals".
- When the UI requires specific visual feedback states: **Success** (Green), **Fail** (Red), **Warning** (Yellow), **Info** (Blue).
- When implementing "Destructive Actions" (e.g., Delete Account) requiring a specific "Dangerous Decision" UI.

## 1. The Design System (Theme)

The modal relies on a centralized color palette. The agent must ensure `config/theme.tsx` (or equivalent) exists with these specific semantic colors.

```typescript
// config/theme.tsx
export const colors = {
  primary: "#111827",
  secondary: "#1f2937",
  tertiary: "#374151",
  white: "#ffffff",
  tint: "#f9fafb",
  fail: "#ef4444",      // Red
  success: "#16a34a",   // Green
  warning: "#ca8a04",   // Yellow/Orange
  info: "#0284c7",      // Light Blue
  decision: "#3b82f6",  // Blue
  neutral: "#6b7280",   // Grey
};
2. Component Architecture
The component uses a Switch Logic pattern to determine its visual style dynamically.

Core Logic Requirements
Input Props: Must accept a messageType enum to drive the logic.

Visual Style: The icon must be absolutely positioned with a negative top margin (top: -50) to create the "floating badge" effect.

Button Logic:

Informational types (Success/Fail/Info): Render a single "Dismiss" button.

Decision types: Render two buttons ("Cancel" and "Proceed").

The Reference Implementation
The agent should use this structure for the MessageModal.tsx component:

TypeScript
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
  modalView: { width: '85%', backgroundColor: colors.white, borderRadius: 15, paddingTop: 50, paddingBottom: 25, paddingHorizontal: 25, alignItems: 'center', elevation: 5 },
  modalIcon: { position: 'absolute', top: -50, width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: colors.white, elevation: 10 },
  modalContent: { width: '100%', alignItems: 'center' },
  headerText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: colors.primary, textAlign: 'center' },
  messageText: { fontSize: 16, color: colors.tertiary, textAlign: 'center', marginBottom: 20 },
  decisionRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  button: { borderRadius: 10, padding: 12, elevation: 2, minWidth: 100, alignItems: 'center' },
  altButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.neutral },
  buttonText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
  altButtonText: { color: colors.neutral, fontWeight: 'bold', fontSize: 16 }
});
3. Usage Patterns
When implementing the modal in a screen, use these patterns:

1. The "Dangerous Decision" Pattern (e.g., Delete Account):

TypeScript
<MessageModal
  visible={showDeleteModal}
  messageType={MessageTypes.DANGEROUS_DECISION}
  headerText="Delete Account?"
  messageText="This action is irreversible."
  buttonText="Delete"
  onDismiss={() => setShowDeleteModal(false)}
  onProceed={handleDeleteAccount}
/>
2. The "Simple Success" Pattern:

TypeScript
<MessageModal
  visible={showSuccessModal}
  messageType={MessageTypes.SUCCESS}
  headerText="Success!"
  messageText="Data saved successfully."
  onDismiss={() => setShowSuccessModal(false)}
/>
4. Dependencies
The agent must ensure the following are installed:

react-native

@expo/vector-icons (or react-native-vector-icons if not using Expo)
