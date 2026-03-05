import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { Images, RECIPE_IMAGES } from '@/assets/images';
import { Colors } from '@/constants/theme';
import { recipes } from '@/data/recipes';

const CARD_GAP = 12;
const NUM_COLUMNS = 2;

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cardSize = (width - CARD_GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  const onPressRecipe = useCallback(
    (id: string) => {
      router.push({ pathname: '/recipe/[id]', params: { id } });
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof recipes)[0] }) => (
      <Pressable
        style={[styles.card, { width: cardSize, height: cardSize + 72 }]}
        onPress={() => onPressRecipe(item.id)}
        android_ripple={{ color: 'rgba(219,59,50,0.2)' }}
      >
        <Image
          source={RECIPE_IMAGES[item.id] ?? Images.icon}
          style={[styles.cardImage, { height: cardSize }]}
          contentFit="cover"
        />
        <View style={styles.cardTitleWrap}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      </Pressable>
    ),
    [cardSize, onPressRecipe]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={Images.adaptiveIcon}
          style={styles.headerIcon}
          contentFit="contain"
        />
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>NoshiToshi</Text>
          <Text style={styles.headerSubtitle}>Chinese · Pakistani Recipes</Text>
        </View>
      </View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.headerBg,
    borderBottomWidth: 2,
    borderBottomColor: Colors.orange,
  },
  headerIcon: {
    width: 44,
    height: 44,
    marginRight: 12,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.headerText,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.golden,
    marginTop: 4,
  },
  list: {
    padding: CARD_GAP,
    paddingBottom: 32,
  },
  row: {
    gap: CARD_GAP,
    marginBottom: CARD_GAP,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.darkBrown,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: Colors.golden,
  },
  cardImage: {
    width: '100%',
    borderRadius: 0,
  },
  cardTitleWrap: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    minHeight: 72,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
  },
});
