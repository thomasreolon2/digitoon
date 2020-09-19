import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Animated,
  PanResponder,
  TextInput,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./src/styles";
import myCollectionData from "./src/myCollectionData";

import colors from "./src/colors";
import AddListModal from "./components/createCollection";
import * as Animatable from "react-native-animatable";
import Gestures from "react-native-easy-gestures";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import onEditor from "./components/onEditor";

export default class Home extends React.Component {
  state = {
    addTodoShow: false,
  };

  toggleAddTodoShow() {
    this.setState({ addTodoShow: !this.state.addTodoShow });
  }

  list_render = (list) => {
    const amountValue = list.todos.length;
    //const valuefree = list.todos.filter((todo) => todo.completed).length;
    // const remaining_count = list.todos.length - valuefree;

    return (
      <View>
        <Animatable.View animation="zoomInDown" duration={1600}>
          <TouchableOpacity
            style={[
              styles.listContainer,
              { backgroundColor: colors.lightBlue },
            ]}
            onPress={() =>
              this.props.navigation.navigate("onEditor", {
                list: list,
                this: this.bounce,
              })
            }
          >
            <Text style={styles.listTitle} numberOfLines={1}>
              {list.name}
            </Text>
            <View style={styles.divider}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "stretch",
                  left: -10,
                }}
              >
                <Text style={styles.count}>{amountValue}</Text>
                <Text style={styles.subtitle}>Items</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "stretch",
                  right: -10,
                }}
              >
                <Text style={styles.count}>1</Text>
                <Text style={styles.subtitle}>Person</Text>
              </View>
            </View>
            <ImageBackground
              style={styles.litContainerImage}
              source={list.image}
            ></ImageBackground>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoShow}
          onRequestClose={() => this.toggleAddTodoShow()}
        >
          <AddListModal closeModal={() => this.toggleAddTodoShow()} />
        </Modal>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginLeft: 50,
          }}
        >
          <Text style={[styles.title, { top: 0 }]}>
            DIGI
            <Text style={{ fontWeight: "300", color: colors.blue }}>Toon</Text>
          </Text>

          <View style={[styles.line, { top: 12 }]} />
        </View>

        <Animatable.View
          animation="zoomIn"
          duration={1400}
          style={{ left: -100 }}
        >
          <View
            style={{
              marginVertical: 48,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.toggleAddTodoShow()}
            >
              <AntDesign name="plus" size={14} color={colors.blue} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionsButton, { marginLeft: 10, top: 2 }]}
              onPress={() => this.toggleAddTodoShow()}
            >
              <AntDesign name="tool" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
        </Animatable.View>

        <View style={{ height: 380, paddingLeft: 32 }}>
          <FlatList
            ref={(ref) => (this.flatList = ref)}
            onContentSizeChange={() => {
              this.flatList.scrollToEnd({ animated: true });
            }}
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
            data={myCollectionData}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.list_render(item)}
          />
        </View>
      </View>
    );
  }
}
