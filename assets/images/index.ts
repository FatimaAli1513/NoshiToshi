/**
 * Central image exports. Use in app as: Images.icon, Images.adaptiveIcon, etc.
 */

export const Images = {
  icon: require('./icon.png'),
  adaptiveIcon: require('./adaptive-icon.png'),
  splashIcon: require('./splash-icon.png'),
  favicon: require('./favicon.png'),
  backButtonIcon: require('./back.png'),
  cornSoup: require('./chicken_corn_soup.webp'),
  friedRice: require('./chicken-fried-rice.jpeg'),
  hakkaNoodles: require('./hakkaNoodles.jpeg'),
  sweetSourChicken: require('./sweetSourSoup.jpeg'),
  chickenChowMein: require('./chowmin.jpg'),
  chickenManchurian: require('./manchurian.jpg'),
} as const;

export type ImageKey = keyof typeof Images;
