import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Images, RECIPE_IMAGES } from '@/assets/images';
import { Colors } from '@/constants/theme';
import { useLocale } from '@/context/LocaleContext';
import { recipes } from '@/data/recipes';

export default function RecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t, locale } = useLocale();

  const recipe = useMemo(() => recipes.find((r) => r.id === id), [id]);
  const isRtl = locale === 'ur';
  const ingredients = !recipe ? [] : (isRtl && t.recipeDetails?.[recipe.id] ? t.recipeDetails[recipe.id].ingredients : recipe.ingredients);
  const steps = !recipe ? [] : (isRtl && t.recipeDetails?.[recipe.id] ? t.recipeDetails[recipe.id].steps : recipe.steps);

  if (!recipe) {
    return (
      <View style={[styles.centered, isRtl && rtlStyles.container]}>
        <Text style={styles.errorText}>{t.recipeNotFound}</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{t.goBack}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, isRtl && rtlStyles.container]}>
      <View style={[styles.header, isRtl && rtlStyles.header]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, isRtl && rtlStyles.backButton]}
          hitSlop={12}
          android_ripple={{ color: 'rgba(255,249,235,0.3)' }}
        >
          <Image source={Images.backButtonIcon} style={[styles.backButtonIcon, isRtl && rtlStyles.backButtonIcon]} contentFit="contain" />
          <Text style={styles.backButtonText}>{t.back}</Text>
        </Pressable>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={RECIPE_IMAGES[recipe.id] ?? Images.icon}
          style={[styles.heroImage]}
          contentFit="cover"
        />
        <View style={[styles.body, isRtl && rtlStyles.body]}>
          <Text style={styles.title}>{t.recipeNames[recipe.id] ?? recipe.name}</Text>

          <Text style={styles.sectionTitle}>{t.ingredients}</Text>
          <View style={styles.list}>
            {ingredients.map((line, i) => (
              <Text key={i} style={styles.bullet}>
                • {line}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>{t.method}</Text>
          <View style={styles.steps}>
            {steps.map((step, i) => (
              <View key={i} style={[styles.stepRow, isRtl && rtlStyles.stepRow]}>
                <View style={styles.stepNum}>
                  <Text style={styles.stepNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const rtlStyles = StyleSheet.create({
  container: { direction: 'rtl' as const },
  header: { flexDirection: 'row-reverse' },
  backButton: { paddingRight: 0, paddingLeft: 12 },
  backButtonIcon: { transform: [{ scaleX: -1 }] },
  body: { direction: 'rtl' as const },
  stepRow: {},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 52 : 42,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.headerBg,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.orange,
  },
  backButtonIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.headerText,
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  backButtonText: {
    fontSize: 17,
    color: Colors.headerText,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroImage: {
    width: '100%',
    height: 240,
    backgroundColor: Colors.golden,
  },
  body: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 24,
    lineHeight: 30,
    textAlign: 'left'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.accent,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'left'
  },
  list: {
    marginBottom: 24,
  },
  bullet: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 4,
  },
  steps: {
    gap: 14,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.darkBrown,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.cream,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textMuted,
    marginBottom: 16,
    textAlign: 'left'
  },
  backBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.darkBrown,
    borderRadius: 10,
  },
  backBtnText: {
    color: Colors.cream,
    fontWeight: '600',
    textAlign: 'left'
  },
});
