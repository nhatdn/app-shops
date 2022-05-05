import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { navigate } from "../../navigation/NavigationWithoutProp";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../../themes";
import { stackName } from "../../configs/navigationConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Like from "./Like";

export default function DetailScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [bgColor, setBgColor] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [like, setLike] = useState("");
  const productId = route.params.id;
  let obj = useRef({});
  useEffect(() => {
    loadOneProduct();
  }, []);

  const loadOneProduct = async (id) => {
    fetch(`http://svcy3.myclass.vn/api/Product/getbyid?id=${route.params.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        obj.current = data.content;
      })
      .catch(console.log);
  };

  const relatedProducts = () => {
    return obj.relatedProducts.map((item, index) => {
      return (
        <View style={{ marginRight: 15 }}>
          <TouchableOpacity>
            <Image
              source={{ uri: item.image }}
              style={{ height: 150, width: 160 }}
            />
          </TouchableOpacity>
          <View style={{ width: 160 }}>
            <Text style={{ fontWeight: "bold", color: COLORS.grey }}>
              {item.name}
            </Text>
            <Text style={{ fontWeight: "bold", color: COLORS.darkgray }}>
              $ {item.price}
            </Text>
            <Text style={{ color: COLORS.grey }}>{item.shortDescription}</Text>
          </View>
        </View>
      );
    });
  };

  const onPressAddToCart = () => {
    fetch("http://svcy3.myclass.vn/api/Users/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    })
      .then(() => AsyncStorage.getItem("orderDetail"))
      .then((oldData) => {
        if (oldData) {
          oldData = [
            ...JSON.parse(oldData),
            { productId: productId, quantity: quantity },
          ];
        }
        return AsyncStorage.setItem("orderDetail", JSON.stringify(oldData));
      })
      .then(console.log)
      .catch(console.log);
  };

  const shoeDetail = () => {
    const backgroundColor = COLORS.teal;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.grey }}>
          {obj.name}
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: obj.image }}
            style={{ height: 230, width: 250 }}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              position: "relative",
              bottom: 40,
              left: 100,
            }}
          >
            $ {obj.price}
          </Text>
          <Like />
        </View>
        <View
          style={{ flexDirection: "row", position: "relative", bottom: 20 }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Qty: </Text>
          <TextInput
            placeholder="0"
            onChangeText={setQuantity}
            value={quantity}
            style={{
              marginLeft: 5,
              fontSize: 25,
              fontWeight: "bold",
              marginRight: 50,
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            color: COLORS.grey,
          }}
        >
          Size:{" "}
        </Text>
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 10,
          }}
        >
          {obj.size.map((i) => {
            return (
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: COLORS.grey }}
                onPress={() => {
                  backgroundColor;
                }}
              >
                {i}
              </Text>
            );
          })}
        </View>
        <View style={{ fontSize: 20, fontWeight: "bold" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 12,
              color: COLORS.grey,
            }}
          >
            Description:
          </Text>
          <Text style={{ fontSize: 15, color: COLORS.darkgray }}>
            {obj.description}
          </Text>
        </View>

        <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.grey }}>
          Related Products:
        </Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data && relatedProducts()}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, marginLeft: 30, marginTop: 50 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 30,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate(stackName.cartOrderStack)}>
          <AntDesign name="shoppingcart" size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 8 }}>
        <ScrollView horizontal={false} key={id}>
          {obj && shoeDetail()}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.gray,
            height: 50,
            alignItems: "center",
            width: 60,
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <AntDesign name="hearto" size={30} onPress={() => loadCart()} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressAddToCart()}
          style={{
            backgroundColor: COLORS.teal,
            height: 50,
            alignItems: "center",
            width: 260,
            justifyContent: "center",
            borderRadius: 10,
            marginRight: 20,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "orange" }}>
            {" "}
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
  },
});
