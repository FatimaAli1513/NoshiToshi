import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { Images, RECIPE_IMAGES } from '@/assets/images';
import { Colors } from '@/constants/theme';
import { useLocale } from '@/context/LocaleContext';
import { recipes } from '@/data/recipes';
import { type Locale } from '@/locale/translations';

const LANGUAGES: { locale: Locale; label: string; flag: string }[] = [
  { locale: 'en', label: 'English', flag: '🇺🇸' },
  { locale: 'ur', label: 'اردو', flag: '🇵🇰' },
];

const CARD_GAP = 12;
const NUM_COLUMNS = 2;

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t, locale, setLocale } = useLocale();
  const [langModalVisible, setLangModalVisible] = useState(false);
  const isRtl = locale === 'ur';
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
            {t.recipeNames[item.id] ?? item.name}
          </Text>
        </View>
      </Pressable>
    ),
    [cardSize, onPressRecipe, t, isRtl]
  );

  return (
    <View style={[styles.container, isRtl && homeRtl.container]}>
      <View style={[styles.header, isRtl && homeRtl.header]}>
        <Image
          source={Images.adaptiveIcon}
          style={styles.headerIcon}
          contentFit="contain"
        />
        <View style={styles.headerTextWrap}>
          <Text style={[styles.headerTitle, isRtl && homeRtl.text]}>NoshiToshi</Text>
          <Text style={[styles.headerSubtitle, isRtl && homeRtl.text]}>{t.headerSubtitle}</Text>
        </View>
        <Pressable
          onPress={() => setLangModalVisible(true)}
          style={styles.globeButton}
          hitSlop={12}
          android_ripple={{ color: 'rgba(255,249,235,0.3)' }}
        >
          <Ionicons name="globe-outline" size={26} color={Colors.headerText} />
        </Pressable>
      </View>
      <Modal
        visible={langModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLangModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setLangModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>{t.selectLanguage}</Text>
            {LANGUAGES.map(({ locale: l, label, flag }) => (
              <Pressable
                key={l}
                style={[styles.langOption, locale === l && styles.langOptionActive]}
                onPress={() => {
                  setLocale(l);
                  setLangModalVisible(false);
                }}
                android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
              >
                <Text style={styles.langFlag}>{flag}</Text>
                <Text style={styles.langLabel}>{label}</Text>
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
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
  globeButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 8,
  },
  langOptionActive: {
    backgroundColor: Colors.golden,
  },
  langFlag: {
    fontSize: 28,
  },
  langLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
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
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
    textAlign: 'left',
  },
});

const homeRtl = StyleSheet.create({
  container: { direction: 'rtl' as const },
  header: { flexDirection: 'row-reverse' },
  text: { textAlign: 'right', writingDirection: 'rtl' as const },
});
