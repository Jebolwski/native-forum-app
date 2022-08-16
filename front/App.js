import AuthContext, { AuthProvider } from "./AuthContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import Profile from "./screens/Profile";
import { StatusBar, View } from "react-native";
import Settings from "./screens/Settings";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcons from "react-native-vector-icons/Ionicons";
import BottomNavigator from "./components/BottomNavigator";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen
        options={{
          headerStyle: { display: "none" },
        }}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileStack" component={Profile} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ padding: 0, margin: 0 }}>
        <StatusBar backgroundColor="rgb(41, 37, 36)" barStyle="light-content" />
      </View>
      <TailwindProvider>
        <AuthProvider>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              tabBarInactiveTintColor: "gray",
              tabBarActiveTintColor: "rgb(245,245,245)",
              headerTitleAlign: "center",
              headerShadowVisible: true,
              tabBarStyle: {
                position: "absolute",
                bottom: 10,
                backgroundColor: "rgb(30,30,30)",
                borderWidth: 0.4,
                borderColor: "white",
                width: "90%",
                marginLeft: "5%",
                borderRadius: 10,
              },
            }}
          >
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
          <BottomNavigator />
        </AuthProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}
