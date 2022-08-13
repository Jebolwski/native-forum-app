import AuthContext, { AuthProvider } from "./AuthContext";
import Home from "./screens/Home";
import CreateForm from "./screens/CreateForm";
import Login from "./screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <TailwindProvider>
        <AuthProvider>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: "center",
            }}
            initialRouteName="Login"
          >
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{
                headerShown: true,
              }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{
                headerTitle: "Create a form",
                headerShown: true,
              }}
              name="CreateForm"
              component={CreateForm}
            />
            <Stack.Screen
              options={{
                headerTitle: "Profile",
                headerShown: true,
              }}
              name="Profile"
              component={Profile}
            />
            <Stack.Screen
              options={{
                headerTitle: "Settings",
                headerShown: true,
              }}
              name="Settings"
              component={Settings}
            />
          </Stack.Navigator>
        </AuthProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}
