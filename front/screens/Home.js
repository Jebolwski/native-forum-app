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
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import AuthContext from "../AuthContext";
import FormSingle from "../screens/FormSingle";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Evil from "react-native-vector-icons/EvilIcons";
import Foundation from "react-native-vector-icons/Foundation";
import { colors } from "../colors/colors";

const Home = ({ navigation }) => {
  let { user } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [profile, setProfile] = useState();
  const [body, setBody] = useState();
  const [btnBackgroundColor, setBtnBackgroundColor] = useState(
    "rgba(29, 155, 240,0.7)"
  );
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
    if (body == "" || body == undefined || body == null) {
      alert("Enter something to add a note.");
    } else {
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
        setForms([data, ...forms]);
        LayoutAnimation.configureNext(layoutconfig);
        setBody("");
        textRef.current.clear();
      }
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
      let data = forms.filter(function (form) {
        return form.id != id;
      });
      setForms(data);
    }
  };
  const isFocused = useIsFocused();

  const layoutconfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  let getProfile = async (props) => {
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

  useEffect(() => {
    FormsGel();
    getProfile();
  }, [isFocused]);

  let textRef = useRef();

  useEffect(() => {
    FormsGel();
  }, []);
  BackHandler.addEventListener("hardwareBackPress", function () {
    return true;
  });
  if (!profile) {
    return (
      <View>
        <Text className="text-center twxt-white">Yükleniyor...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView className="container h-full bg-stone-800">
        <View className="shadow-sm mt-6">
          <View className="flex flex-row justify-evenly">
            <View
              className="grid grid-cols-1 content-center"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text className="font-bold text-white">{user.username}</Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              >
                <Icon name="gear" size={26} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              >
                <Image
                  className=" w-9 h-9 rounded-full"
                  style={{ borderColor: "white", borderWidth: 1 }}
                  source={{
                    uri: `http://192.168.0.11:19002/api${profile.profile_pic}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-3.5 items-center w-full relative text-input">
            <TextInput
              placeholder="What's happening ?"
              className="w-5/6 rounded-lg bg-stone-800 p-2 text-white"
              style={{ borderWidth: 1, borderColor: "white" }}
              multiline={true}
              placeholderTextColor="white"
              numberOfLines={4}
              ref={textRef}
              onChangeText={(text) => {
                setBody(text);
                if (text.length > 0) {
                  setBtnBackgroundColor(colors.blue);
                } else {
                  setBtnBackgroundColor("rgba(29, 155, 240,0.7)");
                }
              }}
            />
          </View>

          <View className="items-center vertical-icons">
            <View className="flex flex-row w-5/6 justify-between mt-2">
              <View className="flex-row w-1/2 justify-between">
                <View style={{ display: "flex", justifyContent: "center" }}>
                  <Icon name="image" color={colors.blue} size={19} />
                </View>
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
              <View style={{ display: "flex", justifyContent: "center" }}>
                <Text
                  style={[
                    styles.btn,
                    {
                      backgroundColor: btnBackgroundColor,
                      borderWidth: 1,
                      borderColor: btnBackgroundColor,
                    },
                  ]}
                  onPress={createForm}
                >
                  Tweetle
                </Text>
              </View>
            </View>
          </View>

          <ScrollView
            className="h-3/4 mt-8"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {forms.map((form) => {
              return (
                <FormSingle
                  key={form.id}
                  form={form}
                  forms={forms}
                  setForms={setForms}
                />
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
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

export default Home;
