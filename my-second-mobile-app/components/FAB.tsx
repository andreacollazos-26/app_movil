import { Text, Pressable, StyleSheet } from 'react-native';

interface Props {
  label: string;
  position?: 'left' | 'right';
  onPress?: () => void;
  onLongPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  floating?: boolean;
}

export default function FAB({
  label,
  position = 'right',
  onPress,
  onLongPress,
  variant = 'primary',
  disabled = false,
  floating = true,
}: Props) {
  const textVariantStyle =
    variant === 'secondary'
      ? styles.secondaryText
      : variant === 'danger'
        ? styles.dangerText
        : styles.primaryText;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={({ pressed }) => [
        floating ? styles.floatingButton : styles.inlineButton,
        floating &&
          (position === 'right' ? styles.positionRight : styles.positionLeft),
        styles[variant],
        disabled && styles.disabledButton,
        !disabled && pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={[styles.label, textVariantStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#2563EB',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  inlineButton: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionRight: {
    right: 20,
  },
  positionLeft: {
    left: 20,
  },
  primary: {
    backgroundColor: '#2563EB',
  },
  secondary: {
    backgroundColor: '#E2E8F0',
  },
  danger: {
    backgroundColor: '#EF4444',
  },
  disabledButton: {
    opacity: 0.45,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#0F172A',
  },
  dangerText: {
    color: '#FFFFFF',
  },
});
