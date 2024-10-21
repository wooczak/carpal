import { TextStyle } from "react-native";

export const TextVariant = {
  MAIN_HEADING: "mainHeading",
  MAIN_HEADING_BOLD: "mainHeadingBold",
  SUBHEADING: "subHeading",
  SUBHEADING_BOLD: "subHeadingBold",
  REGULAR: "textRegular",
  REGULAR_BOLD: "textRegularBold",
  ACCENT: "textAccent",
  ACCENT_BOLD: "textAccentBold",
} as const;

export const lightYellow = "#FEFBD8";
export const mainPeach = "#EECEB9";
export const lightPurple = "#BB9AB1";
export const mainPurple = "#987D9A";

export type TextVariantType = (typeof TextVariant)[keyof typeof TextVariant];

type TextThemeType = Record<TextVariantType, TextStyle>;

export const TextTheme: TextThemeType = {
  mainHeadingBold: {
    color: mainPurple,
    fontSize: 36,
    fontWeight: "800",
  },
  mainHeading: {
    color: mainPurple,
    fontSize: 36,
    fontWeight: "600",
  },
  subHeading: {
    color: mainPurple,
    fontSize: 24,
    fontWeight: "600",
  },
  subHeadingBold: {
    color: mainPurple,
    fontSize: 24,
    fontWeight: "800",
  },
  textRegular: {
    fontSize: 16,
    fontWeight: "400",
  },
  textRegularBold: {
    fontSize: 16,
    fontWeight: "600",
  },
  textAccent: {
    fontSize: 12,
    fontWeight: "400",
  },
  textAccentBold: {
    fontSize: 12,
    fontWeight: "600",
  },
};
