import { View, Text, TextInput, Button } from "react-native";
import React, { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import { colors } from "../colors/colors";

const Login = ({ navigation }) => {
  let { loginUser } = useContext(AuthContext);
  const [username1, setUsername1] = useState();
  const [password1, setPassword1] = useState();
  return (
    <>
      <View className="mx-auto items-center">
        <TextInput
          className="px-4 w-2/3 py-1 rounded-lg mt-14 bg-white border-green-700 border-b-2"
          placeholder="Username"
          onChangeText={(text) => {
            setUsername1(text);
          }}
        />
        <TextInput
          className="px-4 w-2/3 py-1 rounded-lg mt-10  bg-white border-green-700 border-b-2"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword1(text);
          }}
          placeholder="Password"
        />
        <View className="mt-9">
          <Button
            title="Login"
            color={colors.button}
            onPress={async () => {
              let response = await loginUser(username1, password1);
              if (response === "OK") {
                navigation.navigate("Home");
                console.log(response);
              }
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Login;
