import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const DismissKeyboardView: React.FC<{ style: StyleProp<ViewStyle> }> = ({
  children,
  ...props
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    {/*
		<KeyboardAvoidingView {...props} style={props.style} behavior='position'>
		안드로이드에서는 position / 아이폰에서는 padding 적용
		아래 안드로이드, 아이폰 분기처리
		*/}
    <KeyboardAvoidingView
      {...props}
      style={props.style}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}
    >
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
