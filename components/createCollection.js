import React, { Component } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../src/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import styles from "../src/styles";
import myCollectionData from "../src/myCollectionData";
import themesCollectionData from "../src/themesCollectionData";
import * as Animatable from "react-native-animatable";

export default class createCollection extends React.Component {
  state = {
    name: "",
    image: themesCollectionData[0],
    todos: [],
    selected: false,
    must_selected: false,
    must_fill: false,
  };

  createAlert = () => {
    const {
      name,
      image,
      todos,
      must_fill,
      must_selected,
      selected,
    } = this.state;

    if (name.length > 4 && this.state.selected) {
      myCollectionData.push({
        name,
        image,
        todos,
      });

      this.setState({ name: "" });

      this.props.closeModal();
    }

    if (this.state.selected == false) {
      this.setState({ must_selected: true });
    }
    if (name.length < 4) {
      this.setState({ must_fill: true });
    }
  };

  selectItem = (item) => {
    const { image, todos, arts } = this.state;

    this.setState({ todos: [] });

    this.setState((prevState) => ({
      ...prevState,
      todos: [...prevState.todos, ...item.arts],
    }));

    this.setState({ selected: item.name });

    console.log(todos);

    this.setState({ image: item.image });
  };

  colors_render(item) {
    const { selected } = this.state;
    const borderWidth = item.name === selected ? 5 : 0;
    return (
      <TouchableOpacity
        style={styles.color_render_btn}
        onPress={() => {
          this.selectItem(item);
        }}
      >
        <Image
          style={[styles.selectionImage, { borderWidth }]}
          source={item.image}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const borderColor = this.state.must_fill ? "red" : colors.lightBlue;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={Platform.select({ ios: 170, android: -400 })}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}
          onPress={() => this.props.closeModal()}
        >
          <AntDesign name="close" size={30} color={colors.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.modalTitle}>Art Name</Text>

          {this.state.must_fill && (
            <Animatable.Text
              animation={"wobble"}
              duration={1500}
              style={{ fontSize: 16, fontWeight: "600", color: "red" }}
            >
              Minimum lenght: 4 letters.
            </Animatable.Text>
          )}

          <TextInput
            style={[styles.standardInput, { borderColor }]}
            placeholder="Art Name"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <FlatList
              data={themesCollectionData}
              keyExtractor={(item) => item.name}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => this.colors_render(item)}
            />
          </View>

          <TouchableOpacity
            style={[styles.createBtn, { backgroundColor: colors.lightBlue }]}
            onPress={this.createAlert}
          >
            <Text style={{ color: colors.white, fontWeight: "600" }}>
              Create
            </Text>
          </TouchableOpacity>

          {this.state.must_selected && (
            <Animatable.Text
              animation={"shake"}
              duration={1300}
              style={{
                marginTop: 10,
                alignSelf: "center",
                fontSize: 16,
                fontWeight: "600",
                color: "red",
              }}
            >
              Choice a theme!
            </Animatable.Text>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
