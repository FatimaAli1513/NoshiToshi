/**
 * Central image exports. Use in app as: Images.icon, Images.adaptiveIcon, etc.
 */

export const Images = {
  icon: require('./icon.png'),
  adaptiveIcon: require('./adaptive-icon.png'),
  splashIcon: require('./splash-icon.png'),
  favicon: require('./favicon.png'),
  backButtonIcon: require('./back.png'),
} as const;

export type ImageKey = keyof typeof Images;
