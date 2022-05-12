import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../../themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../../navigation/NavigationWithoutProp";
import { stackName, tabName } from "../../configs/navigationConstants";

export default function EditProfile({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("0");
  const [profile, setProfile] = useState([]);

  const editProfile = async () => {
    const data = await AsyncStorage.getItem("Information");
    const { name, email, password, gender, phone } = JSON.parse(data);
    console.log({ name, email, password, gender, phone });
    setName(name);
    setEmail(email);
    setPassword(password);
    setGender(gender);
    setPhone(phone);
  };
  useEffect(async () => {
    await editProfile();
  }, []);
  const saveProfile = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const p = await fetch("http://svcy3.myclass.vn/api/Users/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          phone: phone,
          gender: gender,
        }),
      });
      //   const profile = await p.json();
      //   console.log(profile);
      //   setProfile(profile);
      console.log("successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGender = (value) => {
    console.log(value);
    if (value == "Nam") {
      setGender(true);
    } else if (value == "Nu") {
      setGender(false);
    }
  };
  return (
    <View style={styles.containerProfile}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="close"
          size={30}
          onPress={() => navigate(tabName.profileTab, { updated: true })}
        />
        <TouchableOpacity onPress={() => saveProfile()}>
          <Text style={{ fontSize: 25, marginLeft: 250 }}> Save</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            justifyContent: "center",
            fontWeight: "bold",
            marginLeft: 200,
            marginTop: 20,
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          Edit Profile
        </Text>
        <View style={{ width: 400, marginLeft: 80 }}>
          <Text style={styles.textProfile}>Name</Text>
          <TextInput
            style={styles.textInputProfile}
            defaultValue={name}
            onChangeText={(value) => setName(value)}
          />

          <Text style={styles.textProfile}>Email</Text>
          <TextInput
            style={styles.textInputProfile}
            autoCapitalize="none"
            defaultValue={email}
            onChangeText={(value) => setEmail(value)}
          />

          <Text style={styles.textProfile}>Password</Text>
          <TextInput
            style={styles.textInputProfile}
            defaultValue={password}
            onChangeText={(value) => setPassword(value)}
          />

          <Text style={styles.textProfile}>Gender</Text>
          <TextInput
            style={styles.textInputProfile}
            defaultValue={gender ? "Nam" : "Nu"}
            onChangeText={(value) => handleGender(value)}
          />

          <Text style={styles.textProfile}>Phone</Text>
          <TextInput
            style={styles.textInputProfile}
            defaultValue={phone}
            onChangeText={(value) => setPhone(value)}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerProfile: {
    // justifyContent: 'center',
    alignItems: "center",
    marginTop: 70,
    flex: 1,
  },
  textProfile: {
    alignItems: "flex-start",
    fontSize: 20,
    marginBottom: 10,
  },
  textInputProfile: {
    marginBottom: 10,
    borderWidth: 1,
    height: 30,
    borderColor: COLORS.orange,
    padding: 5,
    width: "80%",
    height: 45,
  },
});
