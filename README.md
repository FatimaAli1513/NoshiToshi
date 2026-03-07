# NoshiToshi

**Chinese food, Pakistani style.**  
A recipe app for Chinese–Pakistani dishes (چائنیز · پاکستانی ترکیبیں).

---

## Features

- **10 recipes** – Chicken Chow Mein, Chicken Manchurian, Chinese Fried Rice, Sweet & Sour Chicken, Hakka Noodles, Chicken Corn Soup, Hot & Sour Soup, Vegetable Spring Rolls, Szechuan Chicken, Honey Garlic Chicken
- **Recipe detail** – Full ingredients list and step-by-step method for each dish
- **Two languages** – English (default) and اردو (Urdu) with correct RTL layout
- **Language picker** – Globe icon in the header opens a modal to switch between English (🇺🇸) and Urdu (🇵🇰)
- **RTL support** – When Urdu is selected, entire app (home + recipe screens) switches to right-to-left layout and Urdu recipe names, ingredients, and method
- **Offline** – All content and images are bundled; no sign-in or server required
- **Theme** – Dark brown header, cream background, golden accents (aligned with NoshiToshi branding)

---

## Tech

- **React Native** (Expo SDK 54), **Expo Router** (file-based routing)
- **TypeScript**, **Yarn**
- **Platforms:** Android, iOS, Web

---

## Privacy

NoshiToshi is designed with privacy in mind:

- **No data collection** – The app does not collect, store, or transmit any personal data, usage data, or analytics.
- **No sign-in or accounts** – You can use the app without creating an account or providing any information.
- **No third-party sharing** – We do not share any data with third parties because we do not collect any.
- **Offline-first** – All recipes, images, and text are bundled in the app. No server calls are made for core functionality.
- **No sensitive permissions** – The app does not access location, contacts, photos, or other sensitive device data.

If you need a privacy policy URL for app store listings, you can host a short policy stating: *"NoshiToshi does not collect, store, or share any personal or usage data."*

---

## Get started

1. **Install dependencies**  
   (If the repo is inside a parent Yarn workspace and install fails, use `npm install` instead.)

   ```bash
   yarn install
   ```

2. **Run the app**

   ```bash
   yarn start
   ```

   Then choose: **Android** / **iOS** / **Web** from the Expo dev tools.

### Scripts

| Command        | Description        |
|----------------|--------------------|
| `yarn start`   | Start Expo dev server |
| `yarn android` | Run on Android     |
| `yarn ios`     | Run on iOS        |
| `yarn web`     | Run in browser    |
| `yarn lint`    | Run ESLint        |

### Build (Android release)

- Keystore and credentials are in the project root (`noshitoshi-release.keystore`, `keystore-credentials.txt`).
- Use them in `android/app/build.gradle` (or EAS Build) for release signing.

---

## Play Store / App Store – Common questions

Use this section when filling store listings and policy forms.

### App identity

| Question / Field   | Answer |
|--------------------|--------|
| **App name**       | NoshiToshi |
| **Short description** | Chinese–Pakistani recipe app. Cook at home with step-by-step recipes in English and Urdu. |
| **Category**        | Food & Drink |
| **Package name (Android)** | com.anonymous.NoshiToshi |

### Content & audience

| Question | Answer |
|----------|--------|
| **Target audience / age group** | Everyone; no age restriction. Content is cooking recipes only. |
| **Content rating** | Suitable for all ages (no violence, no mature content, no gambling). |
| **Does the app contain ads?** | No. |
| **Does the app offer in-app purchases or subscriptions?** | No. |
| **Does the app contain user-generated content?** | No. All recipes and text are static and bundled in the app. |

### Privacy & data

| Question | Answer |
|----------|--------|
| **Does the app collect any user data?** | No. No sign-in, no accounts, no analytics, no personal data collection. |
| **Does the app share user data with third parties?** | No. |
| **Does the app use location?** | No. |
| **Does the app access contacts, photos, or other sensitive data?** | No. |
| **Privacy policy required?** | You still need a privacy policy URL for the store. You can state: “NoshiToshi does not collect, store, or share any personal or usage data.” |

### Permissions

| Question | Answer |
|----------|--------|
| **What permissions does the app use?** | No special permissions required for core use. The app works offline with bundled assets. (If you add features like sharing or camera later, list only those.) |

### Functionality

| Question | Answer |
|----------|--------|
| **Does the app work offline?** | Yes. All recipes, images, and text are included in the app. |
| **Languages supported** | English, Urdu (with RTL). |
| **Required device capabilities** | Standard smartphone; no special hardware. |

---

## Project structure (overview)

- `app/` – Screens (Expo Router): `index.tsx` (home), `recipe/[id].tsx` (recipe detail)
- `assets/images/` – App icon, splash, recipe images (see `assets/images/index.ts`)
- `constants/theme.ts` – Colors (dark brown, cream, golden, etc.)
- `context/LocaleContext.tsx` – Language state (en / ur)
- `data/recipes.ts` – Recipe list (id, name, ingredients, steps)
- `locale/translations.ts` – English and Urdu strings (UI + recipe names, ingredients, steps)

---

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
