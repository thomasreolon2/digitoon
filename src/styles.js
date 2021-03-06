import { StyleSheet } from "react-native";
import colors from "./colors";

export default styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    //backgroundColor: "red",
  },
  line: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  addButton: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,

    alignItems: "center",
    justifyContent: "center",
  },
  optionsButton: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 30,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  skinButton: {
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 25,
    marginTop: 8,
    left: 3,
  },
  listContainer: {
    borderTopRightRadius: 10,

    borderBottomLeftRadius: 40,
    height: 350,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 50,
    marginHorizontal: 12,
    alignItems: "center",
    width: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6,

    elevation: 10,
  },

  litContainerImage: {
    resizeMode: "contain",
    top: -30,
    width: 245,
    height: 260,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",

    borderWidth: 0.5,
  },

  listTitle: {
    fontSize: 20,
    top: 10,
    marginBottom: 10,
    fontWeight: "700",
    alignSelf: "flex-start",
    color: colors.white,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
    top: 16,
    paddingHorizontal: 6,
  },
  count: {
    fontSize: 30,
    fontWeight: "200",
    color: colors.white,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  standardInput: {
    borderWidth: 1,
    borderColor: colors.lightBlue,
    borderRadius: 10,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 14,
    fontSize: 18,
  },
  optionsPosInput: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: colors.black,
    borderColor: colors.black,
    borderRadius: 10,
    height: 40,
    width: 130,
    paddingHorizontal: 14,
    fontSize: 18,
  },
  createBtn: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  color_render_btn: {
    borderRadius: 1,
  },
  title: {
    fontSize: 32,

    fontWeight: "800",
    color: colors.black,
  },
  section: {
    flex: 1,
    paddingVertical: 10,
  },
  header: {
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 0.7,
  },
  taskCount: {
    marginRight: 3,
    alignSelf: "center",
    top: -25,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    backgroundColor: "transparent",
    width: 500,
  },
  filters: {
    paddingHorizontal: 46,

    top: -10,
    borderRadius: 20,
  },
  dragArea: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 100,
    paddingHorizontal: 200,
    top: -60,
  },
  containerTD: {
    flexDirection: "column",
    alignItems: "center",
  },
  containerRender: {
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 50,
  },
  selectionImage: {
    width: 200,
    height: 150,
    borderRadius: 20,
    marginTop: 10,
    paddingVertical: 20,
    borderWidth: 0,
    borderColor: colors.lightBlue,
    marginHorizontal: 10,
    alignItems: "center",
  },

  divider: {
    paddingVertical: 20,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 10,
    top: -20,
  },
  previewContainerImage: {
    marginTop: 30,
    resizeMode: "cover",
    zIndex: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    borderRadius: 50,
  },

  arthair: {
    alignSelf: "center",
    backgroundColor: "transparent",
    borderRadius: 5,
    zIndex: 9999,
  },
  imageItemOpt: {
    backgroundColor: colors.lightBlue,
    borderRadius: 50,
    zIndex: 9999,
    width: 20,
    height: 20,
  },
});
