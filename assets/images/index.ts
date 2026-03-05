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
  sweetSourChicken: require('./SweetSourChicken.png'),
  chickenChowMein: require('./chowmin.jpg'),
  chickenManchurian: require('./manchurian.jpg'),
  sweetSourSoup: require('./sweetSourSoup.jpeg'),
  springRolls: require('./springRoll.jpg'),
  szechuanChicken: require('./szechuanChicken.jpg'),
  honeyGarlicChicken: require('./honey-garlic-chicken.jpg'),
} as const;

export type ImageKey = keyof typeof Images;

/** Recipe id → image for cards and recipe detail */
export const RECIPE_IMAGES: Record<string, (typeof Images)[ImageKey]> = {
  'chicken-chow-mein': Images.chickenChowMein,
  'chicken-manchurian': Images.chickenManchurian,
  'fried-rice': Images.friedRice,
  'sweet-sour-chicken': Images.sweetSourChicken,
  'hakka-noodles': Images.hakkaNoodles,
  'chicken-corn-soup': Images.cornSoup,
  'hot-sour-soup': Images.sweetSourSoup,
  'spring-rolls': Images.springRolls,
  'szechuan-chicken': Images.szechuanChicken,
  'honey-garlic-chicken': Images.honeyGarlicChicken,
};
