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
  return (
    <View className="w-full">
      {user ? (
        <View className="flex-row justify-around w-full border border-black p-1">
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
              <Icon name="home" size={28} />
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
              <IonIcons name="search-outline" size={28} />
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
              <Icon name="bell-o" size={28} />
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
              <IonIcons name="mail-outline" size={28} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              logoutUser();
              navigation.navigate("Login");
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MaterialIcon name="logout" size={28} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </View>
  );
};

export default BottomNavigator;
