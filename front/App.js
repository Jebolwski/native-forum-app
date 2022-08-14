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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <View style={{ padding: 0, margin: 0 }}>
        <StatusBar backgroundColor="rgb(41, 37, 36)" barStyle="light-content" />
      </View>
      <TailwindProvider>
        <AuthProvider>
          <Tab.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
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
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <IonIcons name="home-outline" size={20} color={color} />
                ),
              }}
              name="Home"
              component={HomeStack}
            />

            <Tab.Screen
              options={{
                headerTitle: "Profile",
                tabBarIcon: ({ color, size }) => (
                  <Icon name="user-circle" size={20} color={color} />
                ),
              }}
              name="Profile"
              component={ProfileStack}
            />
            <Tab.Screen
              options={{
                headerTitle: "Settings",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Icon name="gear" size={20} color={color} />
                ),
              }}
              name="Settings"
              component={SettingsStack}
            />
          </Tab.Navigator>
        </AuthProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}
