import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../../navigation/NavigationWithoutProp";

export default function CartOrder({ navigation, route }) {
  const [dataBag, setDataBag] = useState([]);
  const [temp, setTemp] = useState([]);
  useEffect(async () => {
    let data = await AsyncStorage.getItem("orderDetail");
    data = JSON.parse(data);
    setTemp(data);
  }, []);

  useEffect(async () => {
    setDataBag(temp);
  }, [temp]);

  const deleteProduct = async (pos) => {
    let data = JSON.parse(JSON.stringify(dataBag));
    data.splice(pos, 1);
    await AsyncStorage.setItem("orderDetail", JSON.stringify(data));
    setTemp(data);
    console.log("-----------------------------------");
    console.log(dataBag);
  };
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 20 }}>
        Bag
      </Text>
      <View>
        {dataBag.map((item, index) => (
          <View key={index}>
            <Text>
              {item.name} - {item.quantity} - {item.price}
            </Text>
            <Button
              onPress={() => deleteProduct(index)}
              title="Delete"
            ></Button>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.darkteal,
          marginHorizontal: 30,
          height: 60,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: COLORS.white,
            marginBottom: 10,
          }}
        >
          Checkout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
