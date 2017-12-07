import React, { Component } from "react";
import Modal from "react-native-modal";
import { Font } from "expo";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      fontLoaded: false
    };
  }
  /**
   * HANDLERS
   */
  _showModal = () => this.setState({ isModalVisible: true });
  _hideModal = () => this.setState({ isModalVisible: false });
  onLayout(e) {
    const {width, height} = Dimensions.get('window')
  }
  async componentDidMount() {
    await Font.loadAsync({
      "Montserrat-Light": require("../Assets/fonts/Montserrat-Light.ttf"),
      "Montserrat-Regular": require("../Assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Bold": require("../Assets/fonts/Montserrat-Bold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? (
      <View
        style={landscape.container}
      >
        <View
          style={landscape.logo}
        >
          <Image source={require("../Assets/logo.png")} style={{width: 180, height: 65}}/>
        </View>
        <View
          style={landscape.openHouseContainer}
        >
          <View style={landscape.inputButtonContainer}>
            <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 14, marginTop: 25, marginBottom: 10,}}>Create a New Open House</Text>
            <View style={landscape.searchBarContainer}>
              <TextInput
                style={landscape.searchBar}
                placeholder="Enter MLS# or Select a Listing"
              />
              <TouchableOpacity
                style={landscape.buttonContainer}
                onPress={this._showModal}
                underlayColor="#fff"
              >
                <Text
                  style={landscape.buttonText}
                >
                  START
                </Text>
              </TouchableOpacity>
              <View style={landscape.modalContainer}>
              <Modal 
              isVisible={this.state.isModalVisible}
              supportedOrientations={['portrait', 'portrait-upside-down', 'landscape-left', 'landscape-right']}
              >
                <View>
                  <Text>MLS# 12345678</Text>
                  <Text>245 North Maple Avenue, Apt101, Waco</Text>
                  <Text>$345,000</Text>
                </View>
                <View>
                  <Image
                    style={landscape.modalIamge}
                    source={{
                      uri:
                        "https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg"
                    }}
                  />
                </View>
                <View>
                  <View>
                    <TouchableOpacity
                      style={landscape.modalConfirmButton}
                      onPress={() => {
                        this._hideModal();
                        this.props.navigation.navigate("CreateOpenHouse");
                      }}
                      underlayColor="#fff"
                    >
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          paddingLeft: 10,
                          paddingRight: 10
                        }}
                      >
                        Confirm
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={landscape.modalNopeButton}
                      onPress={this._hideModal}
                      underlayColor="#fff"
                    >
                      <Text
                        style={{
                          color: "gray",
                          textAlign: "center",
                          paddingLeft: 10,
                          paddingRight: 10
                        }}
                      >
                        Nope, Wrong Property
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </View>
            </View>
          </View>
          <View>
            <Text>Past Open Houses</Text>
            <Text># of Guests</Text>
            <FlatList
              data={[
                {
                  key: 1,
                  image:
                    "https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg",
                  date: "Oct 24, 2017",
                  address: "245 Maple Ave, Waco",
                  number: 52
                },
                {
                  key: 2,
                  image:
                    "https://cdn.houseplans.com/product/o2d2ui14afb1sov3cnslpummre/w1024.jpg?v=15",
                  date: "Oct 01, 2017",
                  address: "11 West Main St, Lubbock",
                  number: 41
                },
                {
                  key: 3,
                  image:
                    "https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg",
                  date: "Oct 24, 2017",
                  address: "245 Maple Ave, Waco",
                  number: 52
                },
                {
                  key: 4,
                  image:
                    "https://cdn.houseplans.com/product/o2d2ui14afb1sov3cnslpummre/w1024.jpg?v=15",
                  date: "Oct 01, 2017",
                  address: "11 West Main St, Lubbock",
                  number: 41
                },
                {
                  key: 5,
                  image:
                    "https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg",
                  date: "Oct 24, 2017",
                  address: "245 Maple Ave, Waco",
                  number: 52
                },
                {
                  key: 6,
                  image:
                    "https://cdn.houseplans.com/product/o2d2ui14afb1sov3cnslpummre/w1024.jpg?v=15",
                  date: "Oct 01, 2017",
                  address: "11 West Main St, Lubbock",
                  number: 41
                }
              ]}
              renderItem={({ item }) => (
                <View style={landscape.POHItem}>
                  <Image
                    style={landscape.POHItemImage}
                    source={{ uri: `${item.image}` }}
                  />
                  <Text>{item.date}</Text>
                  <Text>{item.address}</Text>
                  <Text>{item.number}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      ) : null;
  }
}

const landscape = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row"
  },
  logo: {
    backgroundColor: "#454545",
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  openHouseContainer: {
    backgroundColor: "#F1F1F1",
    alignItems: "flex-end",
    height: "100%",
    width: "50%"
  },
  inputButtonContainer: {
    paddingLeft: 18,
    borderBottomWidth: 1, 
    borderBottomColor: "#DDDDDD"
  },
  searchBarContainer: {
    flexDirection: "row", 
    alignItems: "center",
    marginBottom: 25,
    marginRight: 20
  },
  searchBar: {
    paddingTop: 10,
    paddingBottom: 5,
    width: 200,
    backgroundColor: "white",
    borderRadius: 2,
    fontFamily: 'Montserrat-Light',
    fontSize: 10,
    textAlign: 'center' 
  },
  buttonContainer: {
    marginLeft: 5,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#25AAFB",
    width: 90,
    borderRadius: 2,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Montserrat-Bold",
    fontSize: 10
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  modalIamge: {
    
    height: 200,
    width: 300,
    alignItems: 'center'
  },
  modalNopeButton: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#fff"
  },
  modalConfirmButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#25AAFB",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#fff"
  },
  POHItem: {
    backgroundColor: "white"
  },
  POHItemImage: {
    width: 50, 
    height: 50
  },
});
