import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import { colors } from "../colors/colors";

const Login = ({ navigation }) => {
  let { loginUser } = useContext(AuthContext);
  const [username1, setUsername1] = useState();
  const [password1, setPassword1] = useState();

  return (
    <>
      <View className="container bg-stone-800 h-full items-center">
        <TextInput
          className="px-4 w-2/3 py-1 rounded-lg mt-14 bg-stone-400 border-2 border-stone-300 "
          placeholder="Username"
          onChangeText={(text) => {
            setUsername1(text);
          }}
        />
        <TextInput
          className="px-4 w-2/3 py-1 rounded-lg mt-14 bg-stone-400 border-2 border-stone-300 "
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword1(text);
          }}
          placeholder="Password"
        />
        <View
          style={{
            borderRadius: 30,
            marginTop: 30,
          }}
        >
          <Button
            title="Login"
            color={"gray"}
            onPress={async () => {
              let response = await loginUser(username1, password1);
              if (response === "OK") {
                navigation.navigate("HomeStack");
              }
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Login;
