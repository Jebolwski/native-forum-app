import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from "../colors/colors";
import slugify from "react-slugify";
import AuthContext from "../AuthContext";

const ProfileFormSingle = (props) => {
  let { user, urlBase } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(props.form.like.length);
  const [profile, setProfile] = useState();

  let getProfile = async () => {
    let response = await fetch(
      `http://${urlBase}/api/profile/${user?.user_id}/`,
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
    let response = await fetch(`http://${urlBase}/api/form/${id}/delete/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == "200") {
      let data = props.forms.filter(function (form) {
        return form.id != id;
      });
      props.setForms(data);
    }
  };

  const likeDislike = async () => {
    let response = await fetch(
      `http://${urlBase}/api/form/${props.form.id}/like/dislike/`,
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
      props.getProfilesForms();
    }
  };

  const [val, setVal] = useState(0);

  const scale1 = useRef(new Animated.Value(val)).current;

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile) {
    return (
      <View className="h-full flex justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View className="items-center w-full border-b">
        <View
          className="p-2 w-full shadow-md"
          style={{
            borderColor: "white",
          }}
        >
          <View className="relative flex-row justify-between">
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.push("Profile", {
                  profile: props.form.profileObj,
                });
              }}
            >
              <View className="flex-row content-center justify-center p-1">
                <Image
                  source={{
                    uri: `http://${urlBase}/api${props.form.profileObj.profile_pic}`,
                  }}
                  className="w-8 h-8 rounded-full"
                />

                <Text
                  style={{
                    paddingLeft: 7,
                    paddingTop: 5,
                  }}
                >
                  {props.form.username}{" "}
                  <Text
                    className="font-light"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {" "}
                    @{slugify(props.form.username)}{" "}
                  </Text>
                  <Text className="font-light pl-3 ">• 17 sa</Text>
                </Text>
              </View>
            </TouchableWithoutFeedback>

            {profile.id == props.form.profile ? (
              <View className="relative">
                <TouchableOpacity
                  onPress={() => {
                    setVal(val == 0 ? 1 : 0);
                    Animated.timing(scale1, {
                      toValue: val,
                      duration: 200,
                      useNativeDriver: true,
                    }).start();
                  }}
                >
                  <Animated.View>
                    <Entypo
                      name="dots-three-horizontal"
                      size={15}
                      style={{ transform: [{ rotate: "90deg" }], marginTop: 5 }}
                    />
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="absolute bg-white border border-gray-400 w-32 right-8 top-4 px-3 py-2 rounded-md"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,
                    zIndex: 30,
                    elevation: 11,
                    transform: [{ scale: scale1 }],
                  }}
                >
                  <Text
                    onPress={() => {
                      deleteForm(props.form.id);
                    }}
                  >
                    Tweeti Sil
                  </Text>
                  <Text>Tweeti Düzenle</Text>
                  <Text>Favorilere Ekle</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <Text
            className="mt-3"
            useRef={props.formUserRef}
            onPress={() => {
              props.navigation.navigate("Tweet", {
                form: props.form,
                profile: profile,
              });
            }}
          >
            {props.form.body}
          </Text>
          <View className="flex-row justify-around mt-4 mb-1">
            <Text
              onPress={() => {
                props.navigation.navigate("AnswerForm", {
                  form: props.form,
                  profile: profile,
                });
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
              {props.form.like.includes(profile.id) ? (
                <Icon name="heart" size={15} color={"red"} />
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

export default ProfileFormSingle;
