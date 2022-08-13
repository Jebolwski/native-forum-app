import {
  View,
  BackHandler,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  LayoutAnimation,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import AuthContext from "../AuthContext";
import FormSingle from "../screens/FormSingle";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../colors/colors";

const Home = ({ navigation }) => {
  let { user } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [profile, setProfile] = useState();
  const [body, setBody] = useState();
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
        <Text className="text-center">Yükleniyor...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView className="container h-full mt-12 bg-gray-100">
        <View className="shadow-sm mt-6">
          <View className="flex flex-row justify-evenly">
            <View
              className="grid grid-cols-1 content-center"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text className="font-bold">{user.username}</Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              >
                <Image
                  className="border border-slate-500"
                  style={styles.settings_icon}
                  source={{
                    uri: `https://freeiconshop.com/wp-content/uploads/edd/settings-solid.png`,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              >
                <Image
                  style={styles.profile_icon}
                  source={{
                    uri: `http://192.168.0.11:19002/api${profile.profile_pic}`,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View className="mt-3.5 items-center w-full relative">
            <TextInput
              placeholder="What's happening ?"
              className="w-5/6 rounded-lg border-2 border-black-100 bg-gray-100 p-2"
              multiline={true}
              numberOfLines={4}
              ref={textRef}
              onChangeText={(text) => {
                setBody(text);
              }}
            />
            <Text
              style={[
                styles.btn,
                { position: "absolute", right: 25, bottom: 6, zIndex: 1 },
              ]}
              onPress={createForm}
            >
              Add
            </Text>
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
    backgroundColor: colors.button,
    padding: 6,
    marginRight: 10,
    marginTop: 4,
    borderRadius: 9,
    color: "white",
    borderWidth: 1,
    borderColor: colors.dark_button,
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
    borderColor: "black",
  },
});

export default Home;
