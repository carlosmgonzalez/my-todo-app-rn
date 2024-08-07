// import * as fs from "fs";
// import * as path from "path";

// const base64String = process.env.GOOGLE_SERVICES_JSON_BASE64;
// if (base64String) {
//   const googleServicesJsonPath = path.resolve(
//     __dirname,
//     "google-services.json"
//   );
//   fs.writeFileSync(
//     googleServicesJsonPath,
//     Buffer.from(base64String, "base64").toString("utf-8")
//   );
// }

// googleServicesFile: process.env.GOOGLE_SERVICES_JSON_BASE64
//   ? "google-services.json"
//   : undefined,

module.exports = {
  expo: {
    name: "Todo",
    slug: "todoAppRnFs",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#119DA4",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.carlosmgonzalez.todoAppRnFs",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: ["android.permission.RECORD_AUDIO"],
      package: "com.carlosmgonzalez.todoAppRnFs",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-image-picker",
        {
          photosPermission: "Allow todo app to acces your photos.",
          cameraPermission: "Allow todo app to acces your camera",
          microphonePermission: "Allow todo app to acces your microphone",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "61a1fc95-7c53-4583-ab04-932a0fb62d55",
      },
    },
  },
};
