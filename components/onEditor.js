import React, { useState, Component } from "react";
import { ItemProvider } from "./ItemContext";

import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Image,
  Slider,
  Dimensions,
  ImageBackground,
  Animated,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { Container, Header, Content, Tab, Tabs } from "native-base";

import styles from "../src/styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
const screen = Dimensions.get("window");
import ModalOptions from "./ModalOptions";
import Gestures from "react-native-easy-gestures";
import { useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { BlurView } from "expo-blur";
import ViewShot from "react-native-view-shot";
import { useIsFocused } from "@react-navigation/native";

export default class onEditor extends React.Component {
  constructor() {
    super();

    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      cur_type: "hair",
      itemsdraggable: [],
      show: false,
      shirtImage: null,
      colorsShow: false,
      colorsShow__: null,
      addTodoShow: false,
      itemDelete: false,
      hair: null,
      filters: false,
      optionsShow: false,
      options: null,
      item_: null,
      undo: false,
      download_art: null,

      types: [
        {
          type: "all",
          buttonIcon: require("../icons/allicon.png"),
          //organize_randomly
        },
        {
          type: "skin",
          buttonIcon: require("../icons/skinicon.png"),
          organize_x: 100,
          organize_y: 100,
        },
        {
          type: "head",
          buttonIcon: require("../icons/headicon.png"),
        },
        {
          type: "hand",
          buttonIcon: require("../icons/handicon.png"),
        },
        {
          type: "hair",
          buttonIcon: require("../icons/hairicon.png"),
        },
        {
          type: "eye",
          buttonIcon: require("../icons/eyeicon.png"),
        },
        {
          type: "nose",
          buttonIcon: require("../icons/noseicon.png"),
        },
        {
          type: "mouth",
          buttonIcon: require("../icons/mouthicon.png"),
        },
        {
          type: "shirt",
          buttonIcon: require("../icons/shirticon.png"),
        },
      ],
    };

    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape",
      });
    });
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ shirtImage: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  toggleUndo() {
    this.setState({ undo: !this.state.undo });
  }

  toggleOptionsShow() {
    this.setState({ optionsShow: !this.state.optionsShow });
  }

  toggleColorsShow() {
    this.setState({ colorsShow: !this.state.colorsShow });
  }

  deleteItem(id) {
    const list = this.state.itemsdraggable.filter((item) => item.key !== id);
    this.setState({ itemsdraggable: list });
  }

  Add_item(todo) {
    const { itemsdraggable } = this.state;
    this.setState({ hair: todo.art });

    const id = itemsdraggable.length;

    itemsdraggable.push({
      layer: 1,
      type: todo.type,
      colors: todo.colors,
      art: todo.art,
      key: id,
    });

    console.log(itemsdraggable);
    this.setState({ itemsdraggable });
  }

  filters = (item) => {
    this.view.bounce();
    if (item.type == "all") {
      this.setState({ filters: false });
    } else {
      this.setState({ filters: true });
      this.setState({ cur_type: item.type });
    }
  };

  handleViewRef = (ref) => (this.view = ref);
  bounce = () =>
    this.view
      .bounce(1300)
      .then((endState) =>
        console.log(endState.finished ? "bounce finished" : "bounce cancelled")
      );

  renderFilter = (item) => {
    return (
      <View style={styles.containerRender}>
        <Animatable.View ref={this.handleViewRef}>
          <TouchableOpacity
            onPress={() => {
              this.filters(item);
            }}
            style={[
              {
                width: 42,
                height: 42,

                marginLeft: -8,
                backgroundColor: colors.white,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.46,
                shadowRadius: 11.14,
                elevation: 17,
                borderRadius: 50,
              },
              {
                marginTop: this.state.orientation === "landscape" ? 15 : 0,
              },
              {
                elevation: this.state.orientation === "landscape" ? 0 : 17,
              },
            ]}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                top: 5,
                alignSelf: "center",
                alignItems: "center",
                resizeMode: "contain",
              }}
              source={item.buttonIcon}
            ></Image>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  };

  renderColors = (item) => {
    console.log(item);

    <View style={{ width: 80, height: 80 }}>
      <TouchableOpacity
        style={{ marginLeft: 4 }}
        onPress={() => {
          console.log("teestt");
        }}
      >
        <Image style={styles.imageItemOpt} source={item.artColor} />
      </TouchableOpacity>
    </View>;
  };

  renderTodo = (todo) => {
    return (
      <View
        style={[
          styles.containerTD,
          {
            marginLeft: this.state.orientation === "landscape" ? -10 : 0,
            paddingHorizontal: 20,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => this.Add_item(todo)}
          style={{
            width: this.state.orientation === "landscape" ? 60 : 70,
            height: this.state.orientation === "landscape" ? 60 : 70,

            backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,

            elevation: 17,
            borderRadius: 10,
          }}
        >
          <Image
            style={{
              width: this.state.orientation === "landscape" ? 60 : 70,
              height: this.state.orientation === "landscape" ? 60 : 70,
              alignSelf: "center",
              opacity: todo.completed ? 0.2 : 1,
              resizeMode: "contain",
            }}
            source={todo.art}
          ></Image>
        </TouchableOpacity>

        <Text
          style={
            (styles.todo,
            {
              textDecorationLine: todo.completed ? "line-throught" : null,
              color: todo.completed ? "red" : colors.black,

              marginTop: 10,
              paddingBottom: 20,
            })
          }
        >
          {todo.title}
        </Text>
      </View>
    );
  };

  pan = new Animated.ValueXY();

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value,
      });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: this.pan.x, dy: this.pan.y },
    ]),
    onPanResponderRelease: () => {
      this.pan.flattenOffset();
    },
  });

  gestureUndo = (c) => {
    c.reset((prevStyles) => {});
  };

  render() {
    //<Text style={styles.taskCount}>
    // {completedCounts} of {taskCount}
    //  </Text>

    let { shirtImage } = this.state;
    const { route } = this.props;
    const options = this.state.options;
    const taskCount = route.params.list.todos.length;
    const ratio = screen.width / 540;

    const completedCounts = route.params.list.todos.filter(
      (todo) => todo.completed
    ).length;
    const itemdrag = this.state.item_;

    return (
      <SafeAreaView style={styles.container}>
        <ItemProvider value={itemdrag}>
          <Modal
            transparent={true}
            visible={this.state.optionsShow}
            onRequestClose={() => this.toggleOptionsShow()}
          >
            <ModalOptions
              itemsdraggable={this.state.itemsdraggable}
              closeModal={() => this.toggleOptionsShow()}
            />
          </Modal>
        </ItemProvider>

        {this.state.itemDelete == true && (
          <BlurView
            intensity={120}
            tint={"dark"}
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                zIndex: 1,

                width: "100%",
                height: "100%",
              },
            ]}
          ></BlurView>
        )}
        <ViewShot
          style={{ zIndex: 3 }}
          ref="viewShot"
          options={{ format: "jpg", quality: 0.9 }}
        >
          <ImageBackground
            style={
              (styles.previewContainerImage,
              {
                width: this.state.orientation === "landscape" ? 500 : 400,
                height: this.state.orientation === "landscape" ? 250 : 200,
                zIndex: 3,
              })
            }
            source={route.params.list.image}
            imageStyle={{
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.push("Home")}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                width: 28,
                height: 28,
                borderRadius: 30,
                backgroundColor: "white",
              }}
            >
              <AntDesign
                name="close"
                style={{ alignSelf: "center", top: 2 }}
                size={23}
                color={colors.black}
              />
            </TouchableOpacity>

            <View style={[styles.dragArea]}>
              {this.state.itemsdraggable.map((item, index) => {
                const id = item.key;
                return (
                  <Gestures
                    style={{
                      top: Math.floor(Math.random() * 50) + 1,
                      bottom: Math.floor(Math.random() * 50) + 1,
                      left: Math.floor(Math.random() * -50) + 1,
                      right: Math.floor(Math.random() * 50) + 1,
                      width: 100,
                      height: 120,
                    }}
                    key={id}
                    scalable={{
                      min: 0.4,
                      max: 2,
                    }}
                    rotatable={true}
                    ref={(c) => {
                      this.gestures = c;
                    }}
                    onStart={(event, styles) => {
                      this.setState({ itemDelete: true });
                      this.setState({ options: index });
                      this.setState({ colorsShow__: index });

                      if (this.state.colorsShow) {
                        this.toggleColorsShow();
                      }
                    }}
                    onEnd={(event, styles) => {
                      //  setTimeout(() => {
                      console.log(options);
                      this.setState({ itemDelete: false });

                      //   }, 500);
                      if (styles.top > 115) {
                        this.deleteItem(id);
                      }

                      this.setState({ item_: item });
                    }}
                  >
                    <Animatable.View
                      animation="rubberBand"
                      duration={1000}
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <Image
                        source={item.art}
                        style={{
                          zIndex: item.layer,
                          width:
                            this.state.orientation === "landscape" ? 90 : 70,
                          height:
                            this.state.orientation === "landscape" ? 90 : 70,
                          resizeMode: "contain",
                        }}
                      />
                      {item.type == "shirt" && (
                        <Image
                          source={{
                            uri: shirtImage,
                          }}
                          style={{
                            position: "absolute",
                            zIndex: 20,
                            backgroundColor: "transparent",
                            alignItems: "center",
                            alignSelf: "center",
                            top: 10,
                            width:
                              this.state.orientation === "landscape" ? 45 : 30,
                            height:
                              this.state.orientation === "landscape" ? 45 : 30,
                            resizeMode: "contain",
                          }}
                        />
                      )}
                    </Animatable.View>
                    {this.state.options === index && (
                      <Animatable.View
                        animation="rubberBand"
                        duration={1000}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                      >
                        <Animatable.View
                          animation="fadeInDown"
                          duration={1000}
                          delay={1200}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              this.toggleColorsShow();
                            }}
                          >
                            <Image
                              style={styles.imageItemOpt}
                              source={require("../icons/color.png")}
                            />
                          </TouchableOpacity>
                        </Animatable.View>

                        <Animatable.View
                          animation="fadeInDown"
                          duration={1000}
                          delay={1400}
                        >
                          <TouchableOpacity
                            style={{ marginLeft: 4 }}
                            onPress={() => {
                              this.toggleOptionsShow();
                            }}
                          >
                            <Image
                              style={styles.imageItemOpt}
                              source={require("../icons/drag.png")}
                            />
                          </TouchableOpacity>
                        </Animatable.View>

                        <Animatable.View
                          animation="fadeInDown"
                          duration={1000}
                          delay={1300}
                        >
                          <TouchableOpacity
                            style={{ marginLeft: 4 }}
                            onPress={() => {
                              this.gestureUndo(this.gestures);
                              //  this.toggleUndo();
                            }}
                          >
                            <Image
                              style={styles.imageItemOpt}
                              source={require("../icons/undo.png")}
                            />
                          </TouchableOpacity>
                        </Animatable.View>

                        {item.type == "shirt" && (
                          <Animatable.View
                            animation="fadeInDown"
                            duration={1000}
                            delay={1300}
                          >
                            <TouchableOpacity
                              style={{ marginLeft: 4 }}
                              onPress={this._pickImage}
                            >
                              <Image
                                style={styles.imageItemOpt}
                                source={require("../icons/uploadimage.png")}
                              />
                            </TouchableOpacity>
                          </Animatable.View>
                        )}
                      </Animatable.View>
                    )}
                    {this.state.colorsShow == true &&
                      this.state.colorsShow__ === index && (
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{
                            justifyContent: "space-evenly",
                            width: 100,
                            height: 30,
                            marginTop: 5,
                          }}
                        >
                          {item.colors.map((item1) => {
                            const random_delay =
                              Math.floor(Math.random() * 300) + 50;

                            return (
                              <Animatable.View
                                animation="bounceIn"
                                duration={1000}
                                delay={random_delay}
                                style={{
                                  alignItems: "center",
                                  alignSelf: "center",
                                }}
                              >
                                <TouchableOpacity
                                  style={[
                                    styles.imageItemOpt,
                                    {
                                      backgroundColor: item1.color,
                                    },
                                  ]}
                                  onPress={() => {
                                    const item_s = this.state.itemsdraggable;

                                    item_s[index] = {
                                      ...item_s[index],
                                      art: item1.artColor,
                                    };
                                    this.setState({ itemsdraggable: item_s });
                                  }}
                                ></TouchableOpacity>
                              </Animatable.View>
                            );
                          })}
                        </ScrollView>
                      )}
                  </Gestures>
                );
                return;
              })}
            </View>
          </ImageBackground>
        </ViewShot>
        <View
          style={[
            styles.section,
            {
              alignSelf:
                this.state.orientation === "landscape"
                  ? "flex-start"
                  : "center",
              right: this.state.orientation === "landscape" ? -20 : 0,
              top: this.state.orientation === "landscape" ? 30 : -5,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              this.refs.viewShot.capture().then((uri) => {
                console.log(uri);
                //await MediaLibrary.saveToLibraryAsync(uri);
              });
            }}
            style={[
              {
                position: "absolute",
                width: 28,
                height: 28,
              },
              {
                right: this.state.orientation === "landscape" ? 0 : -70,
                alignSelf:
                  this.state.orientation === "landscape"
                    ? "center"
                    : "flex-end",
                top: this.state.orientation === "landscape" ? 70 : 25,
              },
            ]}
          >
            <AntDesign
              name="download"
              style={{ alignSelf: "center" }}
              size={25}
              color={colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={[
              {
                position: "absolute",
                width: 28,
                height: 28,
              },
              {
                left: this.state.orientation === "landscape" ? 0 : -70,
                alignSelf:
                  this.state.orientation === "landscape"
                    ? "center"
                    : "flex-start",
                top: this.state.orientation === "landscape" ? 70 : 25,
              },
            ]}
          >
            <AntDesign
              name="find"
              style={{ alignSelf: "center" }}
              size={25}
              color={colors.black}
            />
          </TouchableOpacity>
          <Text style={[styles.title, { textAlign: "right" }]}>
            {route.params.list.name}
          </Text>
        </View>

        <View
          style={[
            styles.filters,
            {
              paddingHorizontal:
                this.state.orientation === "landscape" ? 0 : 46,
            },
            {
              width: this.state.orientation === "landscape" ? 100 : 500,
            },
            {
              position:
                this.state.orientation === "landscape"
                  ? "absolute"
                  : "relative",
            },

            { flex: this.state.orientation === "landscape" ? 0 : 2.4 },
            {
              alignSelf:
                this.state.orientation === "landscape" ? "flex-end" : "center",
            },
          ]}
        >
          <FlatList
            data={this.state.types}
            renderItem={({ item }) => this.renderFilter(item)}
            keyExtractor={(item) => item.type}
            horizontal={this.state.orientation === "landscape" ? false : true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View
          style={[
            styles.footer,
            {
              alignItems:
                this.state.orientation === "landscape" ? "flex-end" : "center",
            },

            { flex: this.state.orientation === "landscape" ? 10 : 7 },
          ]}
        >
          <FlatList
            data={route.params.list.todos.filter((item) => {
              if (this.state.filters) {
                return item.type == this.state.cur_type;
              } else {
                return route.params.list.todos;
              }
            })}
            renderItem={({ item }) => this.renderTodo(item)}
            keyExtractor={(item) => item.title}
            numColumns={3}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 10,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <KeyboardAvoidingView
          style={styles.section}
          behaviour="padding"
        ></KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
