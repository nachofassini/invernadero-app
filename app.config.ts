import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Invernadero App",
  description: "Aplicación para el control de un invernadero",
  slug: "invernadero-app",
  version: "1.0.0",
  owner: "nachofassini",
  orientation: "portrait",
  icon: "./assets/happy-strawberry/ios/iTunesArtwork@2x.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/greenhouse.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.nachofassini.invernadero-app",
  },
  android: {
    package: "com.nachofassini.invernadero-app",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "d906d5c8-c495-4b0f-9614-be43c53cb239",
    },
  },
});
