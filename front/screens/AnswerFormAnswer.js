import {
  View,
  BackHandler,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import AuthContext from "../AuthContext";
import FormSingle from "../screens/FormSingle";

import Icon from "react-native-vector-icons/FontAwesome";
import Evil from "react-native-vector-icons/EvilIcons";
import Foundation from "react-native-vector-icons/Foundation";
import { colors } from "../colors/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AnswerFormAnswer = (props) => {
  let creators = props.route.params.form.parents;
  let creators_minus_one = creators.slice(0, creators.length - 1);
  let creators_last = creators.slice(creators.length - 1, creators.length);
  let form_id = props.route.params.form.id;
  let parent_id = props.route.params.form.form;

  let { user, urlBase } = useContext(AuthContext);
  const [textBody, setTextBody] = useState();
  const [profile, setProfile] = useState();
  const [image, setImage] = useState();
  const [result, setResult] = useState();
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

  const upload = async () => {
    const result = await launchCamera(options);
  };

  const pickImage = async (a, b) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [a, b],
      quality: 1,
    });

    setResult(result);
    var formdata = new FormData();
    formdata.append("photo", result.uri);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  let duzenle = async () => {
    var formdata = new FormData();
    if (image != null) {
      formdata.append("photo", {
        name: new Date() + "_profile",
        uri: image,
        type: "image/jpg",
      });
    }
    formdata.append("body", textBody);
    formdata.append("profile_id", profile?.id);
    formdata.append("form_id", form_id);
    formdata.append("parent_id", parent_id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      credentials: "same-origin",
    };
    let response = await fetch(
      `http://${urlBase}/api/form/answer/${form_id}/answer/`,
      requestOptions
    );
    if (response.status === 200) {
      props.navigation.goBack();
    }
  };
  let textRef = useRef();
  useEffect(() => {
    getProfile();
  }, []);

  const [btnBackgroundColor, setBtnBackgroundColor] = useState(
    "rgba(29, 155, 240,0.7)"
  );

  if (profile) {
    return (
      <View className="w-full">
        <View
          className="items-center   h-full bg-neutral-600"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <View className="items-center w-full relative text-input bg-white shadow-2xl h-full">
            <View className="w-full">
              <View className="flex-row justify-between border-b border-gray-400 px-4 py-2">
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.goBack();
                  }}
                  className="flex justify-center"
                >
                  <AntDesign name="close" size={26} />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex justify-center"
                  onPress={duzenle}
                >
                  <View
                    className="px-2 rounded-2xl"
                    style={[
                      styles.btn,
                      {
                        backgroundColor: btnBackgroundColor,
                        borderWidth: 1,
                        borderColor: btnBackgroundColor,
                      },
                    ]}
                  >
                    <Text className="text-white">Yanıtla</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <View>
                  <View className="flex-row justify-between">
                    <View
                      style={{
                        backgroundColor: "rgb(200,200,200)",
                        width: 2,
                        height: 30,
                        marginLeft: 30,
                      }}
                    />
                    <View className="w-4/5 mt-1">
                      <Text>
                        {creators && creators.length > 1 ? (
                          <Text style={{ color: colors.blue }}>
                            {creators_minus_one.map((creator) => {
                              return <Text>@{creator} ve </Text>;
                            })}
                            <Text>
                              @{creators_last} adlı kullanıcılara yanıt olarak
                            </Text>
                          </Text>
                        ) : (
                          <Text style={{ color: colors.blue }}>
                            <Text>
                              @{creators[0]} adlı kullanıcıya yanıt olarak
                            </Text>
                          </Text>
                        )}{" "}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row">
                    <Image
                      source={{
                        uri: `http://${urlBase}/api${profile.profile_pic}`,
                      }}
                      className="h-12 w-12 ml-2 rounded-full"
                      onPress={() => {
                        navigation.navigate("Profile");
                      }}
                    />
                    <TextInput
                      placeholder="Tweet your replay"
                      className="rounded-lg p-2 w-5/6 mb-3 ml-3 mt-1"
                      style={{
                        minHeight: 100,
                        textAlignVertical: "top",
                      }}
                      multiline={true}
                      ref={textRef}
                      onChangeText={(text) => {
                        setTextBody(text);
                        if (text.length > 0) {
                          setBtnBackgroundColor(colors.blue);
                        } else {
                          setBtnBackgroundColor("rgba(29, 155, 240,0.7)");
                        }
                      }}
                    />
                  </View>
                  <View className="ml-16">
                    {image ? (
                      <View className="relative">
                        <Image
                          source={{ uri: image }}
                          className="h-72 w-11/12 rounded-lg"
                        />
                        <View
                          style={{
                            position: "absolute",
                            top: 3,
                            left: 3,
                            borderRadius: 100,
                            backgroundColor: "rgba(40,40,40,0.6)",
                            padding: 10,
                          }}
                        >
                          <Evil
                            onPress={() => {
                              setResult();
                              setImage();
                            }}
                            name="close"
                            size={22}
                            color={"white"}
                          />
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
            <View className="absolute bottom-0 left-0 w-full px-5 py-3 vertical-icons flex">
              <View className="flex-row justify-between">
                <TouchableWithoutFeedback
                  onPress={() => {
                    pickImage(3, 3);
                  }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Icon name="image" color={colors.blue} size={19} />
                </TouchableWithoutFeedback>
                <View style={{ display: "flex", justifyContent: "center" }}>
                  <Icon name="smile-o" color={colors.blue} size={19} />
                </View>
                <View style={{ display: "flex", justifyContent: "center" }}>
                  <Foundation
                    name="graph-horizontal"
                    color={colors.blue}
                    size={19}
                  />
                </View>
                <View style={{ display: "flex", justifyContent: "center" }}>
                  <Evil name="location" color={colors.blue} size={19} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View className="h-full flex justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  btn: {
    padding: 6,
    marginRight: 10,
    marginTop: 4,
    borderRadius: 12,
    color: "white",
    borderWidth: 1,
  },
  settings_icon: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  profile_icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default AnswerFormAnswer;
