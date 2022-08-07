import {
  View,
  BackHandler,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Text,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import AuthContext from "../AuthContext";
import FormSingle from "../screens/FormSingle";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../colors/colors";

const Home = ({ navigation }) => {
  let { user } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [body, setBody] = useState();
  const FormsGel = async () => {
    let response = await fetch("http://192.168.0.11:19002/api/forms/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == "200") {
      let data = await response.json();
      setForms(data);
    }
  };
  const createForm = async () => {
    let response = await fetch("http://192.168.0.11:19002/api/create-form/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: body,
        user: user.user_id,
      }),
    });
    if (response.status == "200") {
      let data = await response.json();
      setForms([...forms, data]);
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    FormsGel();
  }, [isFocused]);

  useEffect(() => {
    FormsGel();
  }, []);

  BackHandler.addEventListener("hardwareBackPress", function () {
    return true;
  });
  return (
    <SafeAreaView className="w-full h-full mt-12 bg-gray-100">
      <View className="shadow-sm mt-6">
        <View className="mt-3.5 items-end w-10/12">
          <TextInput
            placeholder="What's happening ?"
            className="w-5/6 rounded-lg border-2 border-black-100 bg-gray-200 p-2"
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => {
              setBody(text);
            }}
          />
          <Text style={styles.btn} onPress={createForm}>
            Add
          </Text>
        </View>
        <ScrollView className="h-3/4">
          {forms.map((form) => {
            return <FormSingle form={form} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.dark_button,
    padding: 6,
    marginRight: 10,
    marginTop: 4,
    borderRadius: 9,
    color: "white",
    borderWidth: 1,
    borderColor: colors.dark_button,
  },
});

export default Home;
