import React, { useState, Component } from "react";
import ItemContext from "./ItemContext";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Image,
  Textinput,
  Slider,
  Dimensions,
  ImageBackground,
  Animated,
} from "react-native";

import { Container, Header, Content, Tab, Tabs, Item } from "native-base";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import styles from "../src/styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import onEditor from "./onEditor";

export default class ModalOptions extends Component {
  static contextType = ItemContext;
  state = {
    hair: null,
    yValue: null,
    xValue: null,
    layer: 0,
  };

  componentDidMount() {
    this.setState({ layer: this.context.layer });
  }

  layer_plus = (item) => {
    var countp = item.layer;
    const itemsdraggable = this.props.itemsdraggable;

    if (countp < itemsdraggable.length) {
      itemsdraggable.map((e) => {
        if (item.index === e.index) {
          item.layer = countp + 1;
          return item;
        } else {
          return e;
        }
      });

      this.setState({ itemsdraggable });
      console.log(itemsdraggable);
    }
  };

  layer_less = (item) => {
    var countl = item.layer;
    const itemsdraggable = this.props.itemsdraggable;

    if (countl > 0) {
      itemsdraggable.map((e) => {
        if (item.index === e.index) {
          item.layer = countl - 1;
          return item;
        } else {
          return e;
        }
      });

      this.setState({ itemsdraggable });
      console.log(itemsdraggable);
    }
  };

  applyPosition() {}

  render() {
    const item = this.context;
    // const layer = item.layer;
    return (
      <View
        style={{
          backgroundColor: colors.lightBlue,
          borderRadius: 20,
          width: 350,
          height: 250,
          top: 400,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 30,
            paddingHorizontal: 30,
            flexDirection: "row",
            marginRight: 50,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <TextInput
            style={styles.optionsPosInput}
            placeholder="y pos"
            onChangeText={(text) => this.setState({ yValue: text })}
          />
          <TextInput
            style={styles.optionsPosInput}
            placeholder="x pos"
            onChangeText={(text) => this.setState({ xValue: text })}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              paddingTop: 6,
              right: 10,
              zIndex: 10,
              width: 25,
              height: 25,
            }}
            onPress={() => {}}
          >
            <AntDesign name="rightsquare" size={25} color={colors.black} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            paddingVertical: 30,
            paddingHorizontal: 50,
            flexDirection: "row",

            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",

              left: 10,
              zIndex: 10,
              width: 35,
              height: 35,
            }}
            onPress={() => {
              {
                this.layer_less(item);
              }
            }}
          >
            <AntDesign name="caretdown" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text>Layer: {this.context.layer}</Text>
          <TouchableOpacity
            style={{
              position: "absolute",

              right: 10,
              zIndex: 10,
              width: 35,
              height: 35,
            }}
            onPress={() => {
              {
                this.layer_plus(item);
              }
            }}
          >
            <AntDesign name="caretup" size={30} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",

              right: -30,
              zIndex: 10,
              width: 35,
              height: 35,
            }}
            onPress={() => {
              {
              }
            }}
          >
            <AntDesign name="reload1" size={30} color={colors.black} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => this.props.closeModal()}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            width: 35,
            height: 35,
          }}
        >
          <AntDesign name="close" size={30} color={colors.black} />
        </TouchableOpacity>
      </View>
    );
  }
}
