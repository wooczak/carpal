import React from "react";
import { Text, type TextStyle } from "react-native";
import { TextTheme, type TextVariantType } from "./styling";

export default function TextAtom({
  customStyle,
  children,
  noColor,
  variant,
}: {
  customStyle?: TextStyle;
  children: string;
  noColor?: boolean;
  variant: TextVariantType;
}) {
  const textStyle = TextTheme[variant];

  const style = {
    ...textStyle,
    ...customStyle
  };

  if (noColor) style.color = '#000';

  return <Text style={style}>{children}</Text>;
}
