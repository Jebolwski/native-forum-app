import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
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
      <View
        className="p-2 w-full shadow-md bg-stone-800"
        style={{
          borderColor: "white",
          borderWidth: 1,
        }}
      >
        <View className="flex-row justify-between">
          <Text className="text-white">
            {props.form.username}{" "}
            <Text className="font-light" style={{ fontSize: 12 }}>
              {" "}
              @{slugify(props.form.username)}{" "}
            </Text>
            <Text className="font-light pl-3 text-white">
              {" "}
              {props.form.create}
            </Text>
          </Text>
          <Entypo
            name="dots-three-horizontal"
            size={15}
            color={"rgba(255,255,255,0.7)"}
            onPress={() => {
              deleteForm(props.form.id);
            }}
          />
        </View>
        <Text className="mt-3 text-white">{props.form.body}</Text>
        <View className="flex-row justify-around mt-4 mb-1 ">
          <Text>
            <Icon name="comment-o" size={15} color={colors.dark_button} />{" "}
            <Text className="ml-3 text-white">0</Text>
          </Text>
          <Text>
            <AntDesign name="retweet" size={15} color={colors.dark_button} />{" "}
            <Text className="ml-3 text-white">0</Text>
          </Text>
          <Text>
            <Icon name="heart-o" size={15} color={colors.dark_button} />{" "}
            <Text className="ml-3 text-white">0</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FormSingle;
