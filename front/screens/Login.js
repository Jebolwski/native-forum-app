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
      <View className="container bg-white h-full flex items-center justify-center">
        <TextInput
          className="px-4 w-2/3 py-1 rounded-lg border border-stone-800"
          style={{}}
          placeholder="Username"
          onChangeText={(text) => {
            setUsername1(text);
          }}
        />
        <TextInput
          className="px-4 w-2/3 py-1 rounded-lg mt-20 border border-stone-800"
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
            color={colors.blue}
            onPress={async () => {
              let response = await loginUser(username1, password1);
              if (response === "OK") {
                navigation.navigate("Home");
              }
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Login;
