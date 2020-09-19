import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import onEditor from "./components/onEditor";

const Stack = createStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={false} initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} title="Home" />
          <Stack.Screen name="onEditor" component={onEditor} title="onEditor" />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
