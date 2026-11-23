import React from 'react';
import { Text, Pressable } from 'react-native';

interface Props {
  label: string;
  position?: 'left' | 'right';
  onPress?: () => void;
  onLongPress?: () => void;
}

export default function FAB({
  label,
  position = 'right',
  onPress,
  onLongPress,
}: Props) {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <Text>{label}</Text>
    </Pressable>
  );
}
