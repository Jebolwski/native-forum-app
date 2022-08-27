import { View, Text, TouchableWithoutFeedback, ScrollView } from "react-native";
import React, { useContext } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthContext from "../AuthContext";
import { TextInput } from "react-native-gesture-handler";
const Settings = ({ navigation }) => {
  let { user } = useContext(AuthContext);
  let { logoutUser } = useContext(AuthContext);
  return (
    <View className="h-full bg-white">
      <View className="flex-row p-3 border-b border-b-slate-400">
        <View className=" flex justify-center">
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={26} className="font-bold" />
          </TouchableWithoutFeedback>
        </View>
        <View
          className="ml-5 "
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Text className="text-lg">Ayarlar</Text>
          <Text>@{user.username}</Text>
        </View>
      </View>
      <View className="items-center">
        <View className="w-11/12 bg-gray-200 rounded-xl mt-2 relative">
          <View className="absolute top-2 left-4">
            <AntDesign name="search1" size={20} />
          </View>
          <TextInput
            placeholder="Arama ayarları"
            className="p-1 text-center"
          ></TextInput>
        </View>
      </View>
      <ScrollView>
        <View className="flex-row p-3 w-11/12 text-center">
          <View className="w-10 flex justify-center">
            <AntDesign name="user" size={26} />
          </View>
          <View>
            <Text className="font-bold text-lg">Hesabın</Text>
            <Text className="mt-1 text-gray-800">
              Hesabın hakkındaki bilgileri gör, verilerinin arşivini indir veya
              hesap devre dışı bırakma seçeneklerin hakkında bilgi edin.
            </Text>
          </View>
        </View>
        <View className="flex-row p-3 w-11/12 text-center">
          <View className="w-10 flex justify-center">
            <Icon name="shield" size={26} />
          </View>
          <View>
            <Text className="font-bold text-lg">Güvenlik ve hesap erişimi</Text>
            <Text className="mt-1 text-gray-800">
              Hesabın hakkındaki bilgileri gör, verilerinin arşivini indir veya
              hesap devre dışı bırakma seçeneklerin hakkında bilgi edin.
            </Text>
          </View>
        </View>
        <View className="flex-row p-3 w-11/12 text-center">
          <View className="w-10 flex justify-center">
            <Icon name="money" size={24} />
          </View>
          <View>
            <Text className="font-bold text-lg">Gelire dönüştürme</Text>
            <Text className="mt-1 text-gray-800">
              Hesabın hakkındaki bilgileri gör, verilerinin arşivini indir veya
              hesap devre dışı bırakma seçeneklerin hakkında bilgi edin.
            </Text>
          </View>
        </View>
        <View className="flex-row p-3 w-11/12 text-center">
          <View className="w-10 flex justify-center">
            <AntDesign name="lock" size={26} />
          </View>
          <View>
            <Text className="font-bold text-lg">Gizlilik ve güvenlik</Text>
            <Text className="mt-1 text-gray-800">
              Hesabın hakkındaki bilgileri gör, verilerinin arşivini indir veya
              hesap devre dışı bırakma seçeneklerin hakkında bilgi edin.
            </Text>
          </View>
        </View>
        <View className="flex-row p-3 w-11/12 text-center">
          <View className="w-10 flex justify-center">
            <AntDesign name="lock" size={26} />
          </View>
          <View>
            <Text className="font-bold text-lg">Bildirimler</Text>
            <Text className="mt-1 text-gray-800">
              Hesabın hakkındaki bilgileri gör, verilerinin arşivini indir veya
              hesap devre dışı bırakma seçeneklerin hakkında bilgi edin.
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={async () => {
            let a = await logoutUser();
            if (a == "a") {
              navigation.navigate("Login");
            }
          }}
        >
          <View className="flex-row p-3 w-11/12 text-center">
            <View className="w-10 flex justify-center">
              <AntDesign name="logout" size={22} />
            </View>
            <View>
              <Text className="font-bold text-lg">Logout</Text>
              <Text className="mt-1 text-gray-800">
                Hesabın hakkındaki bilgileri gör, verilerinin arşivini indir
                veya hesap devre dışı bırakma seçeneklerin hakkında bilgi edin.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default Settings;
