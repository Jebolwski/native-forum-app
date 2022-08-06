import AuthContext, { AuthProvider } from "./AuthContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";

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
          </Stack.Navigator>
        </AuthProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}
