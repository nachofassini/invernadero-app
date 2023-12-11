module.exports = {
  expo: {
    name: "invernadero-app",
    slug: "invernadero-app",
    version: "1.0.0",
    owner: "nachofassini",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "0.0.0-beta-1",
    },
    android: {
      package: "com.nachofassini.invernaderoapp",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiUrl: process.env.API_URL,
      eas: {
        projectId: "d906d5c8-c495-4b0f-9614-be43c53cb239",
      },
    },
  },
};
