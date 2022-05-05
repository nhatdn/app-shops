import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { stackName } from "../configs/navigationConstants";
import HomeTab from "./Tab/HomeTab";
import Screen from "../screens";
import LoginUI from "../LoginUI/Login";
import RegisterUI from "../LoginUI/RegisterUI";
const Stack = createNativeStackNavigator();
export default function RootNavigation() {
  const [isSignIn, setIsSigIn] = useState(true);

  return isSignIn ? (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginUI"
    >
      <Stack.Screen name={stackName.loginStack}>
        {(props) => <LoginUI {...props} setIsSigIn={setIsSigIn} />}
      </Stack.Screen>
      <Stack.Screen name={stackName.signupStack} component={RegisterUI} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={stackName.homeStack} component={HomeTab} />
      <Stack.Screen
        name={stackName.detailStack}
        component={Screen.DetailScreen}
      />
      <Stack.Screen
        name={stackName.cartOrderStack}
        component={Screen.CartOrder}
      />
    </Stack.Navigator>
  );
}
