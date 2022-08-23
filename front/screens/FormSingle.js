import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from "../colors/colors";
import slugify from "react-slugify";
import AuthContext from "../AuthContext";

const FormSingle = (props) => {
  let { user } = useContext(AuthContext);

  const [profile, setProfile] = useState();

  const [likeCount, setLikeCount] = useState(props.form.like.length);

  let getProfile = async () => {
    let response = await fetch(
      `http://192.168.0.11:19002/api/profile/${user.user_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      let data = await response.json();
      setProfile(data);
    }
  };

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

  const likeDislike = async () => {
    let response = await fetch(
      `http://192.168.0.11:19002/api/form/${props.form.id}/like/dislike/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
        }),
      }
    );
    if (response.status == "200") {
      let data = await response.json();
      setLikeCount(data);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  for (a in props.form.like.length) {
    console.log(a);
  }
  if (!profile) {
    return (
      <View className="h-full flex justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View className="items-center w-full border-b ">
        <View
          className="p-2 w-full shadow-md"
          style={{
            borderColor: "white",
          }}
        >
          <View className="flex-row justify-between">
            <Text>
              {props.form.username}{" "}
              <Text className="font-light" style={{ fontSize: 12 }}>
                {" "}
                @{slugify(props.form.username)}{" "}
              </Text>
              <Text className="font-light pl-3 ">• 17 sa</Text>
            </Text>
            <Entypo
              name="dots-three-horizontal"
              size={15}
              onPress={() => {
                deleteForm(props.form.id);
              }}
              style={{ transform: [{ rotate: "90deg" }], marginTop: 5 }}
            />
          </View>
          <Text
            className="mt-3"
            useRef={props.formUserRef}
            onPress={() => {
              props.navigation.navigate("Tweet", { form: props.form });
            }}
          >
            {props.form.body}
          </Text>
          <View className="flex-row justify-around mt-4 mb-1">
            <Text
              onPress={() => {
                props.setAnswermodalVisible(true);
              }}
            >
              <Icon name="comment-o" size={15} color={colors.dark_button} />{" "}
              <Text className="ml-3">{props.form.answer_count}</Text>
            </Text>
            <Text>
              <AntDesign name="retweet" size={15} color={colors.dark_button} />{" "}
              <Text className="ml-3 ">0</Text>
            </Text>
            <Text onPress={likeDislike}>
              {profile.id in props.form.like ? (
                <Icon name="heart" size={15} color={colors.dark_button} />
              ) : (
                <Icon name="heart-o" size={15} color={colors.dark_button} />
              )}{" "}
              <Text>{likeCount}</Text>
            </Text>
            <Text>
              <EvilIcon
                name="share-google"
                size={22}
                color={colors.dark_button}
              />{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default FormSingle;
