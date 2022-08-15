import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
} from "react-native";
import React, { useContext } from "react";
import AuthContext from "../AuthContext";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const BottomNavigator = () => {
  let { user } = useContext(AuthContext);
  let { logoutUser } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(user);
  return (
    <View className="items-center absolute bottom-3 w-full">
      <View className="flex-row justify-around w-5/6 bg-stone-800 border border-white rounded-md p-1">
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Icon name="home" size={28} color="white" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IonIcons name="search-outline" size={28} color="white" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Icon name="bell-o" size={28} color="white" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IonIcons name="mail-outline" size={28} color="white" />
          </View>
        </TouchableWithoutFeedback>

        {user ? (
          <TouchableWithoutFeedback
            onPress={() => {
              logoutUser();
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MaterialIcon name="logout" size={28} color="white" />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MaterialIcon name="login" size={28} color="white" />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export default BottomNavigator;
