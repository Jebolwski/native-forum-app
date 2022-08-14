import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../colors/colors";
import slugify from "react-slugify";

const FormSingle = (props) => {
  const deleteForm = async (id) => {
    let response = await fetch(
      `http://192.168.0.11:19002/api/form/${id}/delete/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status == "200") {
      let data = props.forms.filter(function (form) {
        return form.id != id;
      });
      props.setForms(data);
    }
  };
  return (
    <View className="items-center w-full">
      <View className="p-2 w-full border-b-2 border-t-2 border-white shadow-md mt-4 bg-stone-800">
        <View className="flex-row justify-between">
          <Text className="text-white">
            {props.form.username} •
            <Text className="font-light pl-3 text-white">
              {" "}
              {props.form.create}
            </Text>
          </Text>
          <Icon
            name="trash"
            size={15}
            color={"darkred"}
            onPress={() => {
              deleteForm(props.form.id);
            }}
          />
        </View>
        <Text className="mt-3 text-white">{props.form.body}</Text>
        <View className="flex-row justify-around mt-4 mb-1 ">
          <Text>
            <Icon name="comment" size={15} color={colors.dark_button} />{" "}
            <Text className="ml-3 text-white">0</Text>
          </Text>
          <Text>
            <Icon name="retweet" size={15} color={colors.dark_button} />{" "}
            <Text className="ml-3 text-white">0</Text>
          </Text>
          <Text>
            <Icon name="heart" size={15} color={colors.dark_button} />{" "}
            <Text className="ml-3 text-white">0</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FormSingle;
