import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../colors/colors";

const CreateForm = () => {
  const [body, setBody] = useState();

  const createForm = async () => {
    let response = await fetch("http://192.168.0.11:19002/api/create-form/", {
      method: "POST",
      credentials: "same-origin",
      headers: { "X-CSRFToken": "{{csrf_token}}" },
      body: {
        body: body,
      },
    });
    console.log(response.status);
  };

  return (
    <View>
      <View className="items-center">
        <TextInput
          placeholder="What's happening ?"
          className="w-5/6 border rounded-lg border-lime-200 bg-gray-200 mt-14"
          multiline={true}
          numberOfLines={6}
          onChangeText={(text) => {
            setBody(text);
          }}
        />
        <View className="w-5/6 flex-row justify-between mt-3">
          <View className="flex-row">
            <Icon name="play" color={"white"} style={styles.btn} />
            <Icon name="image" color={"white"} style={styles.btn} />
            <Icon name="microphone" color={"white"} style={styles.btn} />
          </View>
          <View>
            <Button color={colors.button} title="Post" onPress={createForm} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.dark_button,
    padding: 13,
    marginRight: 20,
    borderRadius: 9,
  },
});
export default CreateForm;
