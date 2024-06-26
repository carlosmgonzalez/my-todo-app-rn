import { Stack } from "expo-router";

export default function LayoutApp() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        getId={({ params }) => String(Date.now())}
        options={{
          title: "Task Details",
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: "Change Password",
        }}
      />
      <Stack.Screen
        name="category-list"
        options={{
          title: "Category List",
        }}
      />
    </Stack>
  );
}
