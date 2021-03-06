import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import CheckBox from "react-native-checkbox";
import { SegmentedControls } from "react-native-radio-buttons";
import { Dropdown } from "react-native-material-dropdown";
import CustomText from "../CustomText";
import axios from "axios";
import { addLead } from "../../actions";
import { connect } from "react-redux";


class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      phoneNumber: null,
      agent: "",
      realEstateAgent: "Yes",
      agentName: "",
      openHouse: "Select One",
      userFocused: false,
      emailFocused: false,
      phoneFocused: false,
      agentFocused: false,
      source: "",
      checked: false
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onSubmit = openHouseId => {
    const { name, email, source } = this.state;
    const phone = this.state.phoneNumber;
    if(phone === "NotValid") return
    const agent = this.state.agentName;
    const index = this.props.index
    console.log("Adding lead?");
    this.props.addLead(
        this.props.openHouse,
        name,
        email,
        phone,
        agent,
        source,
        index
      )
    this.props.handleSubmit();
  };

  onFocus(focused) {
    if (focused === "user") this.setState({ userFocused: true });
    else if (focused === "email") this.setState({ emailFocused: true });
    else if (focused === "phone") this.setState({ phoneFocused: true });
    else if (focused === "agent") this.setState({ agentFocused: true });
  }

  onBlur(blurred) {
    if (blurred === "user") this.setState({ userFocused: false });
    else if (blurred === "email") this.setState({ emailFocused: false });
    else if (blurred === "phone"){
      if(this.state.phoneNumber.length < 8) {
        this.setState({phoneNumber: "NotValid", phoneFocused: false});
      }
      this.setState({ phoneFocused: false });
      }
    else if (blurred === "agent") this.setState({ agentFocused: false });
  }

  render() {
    const options = ["Yes", "No"];

    const data = [
      { value: "Google" },
      { value: "Facebook" },
      { value: "Email" }
    ];

    let agent = this.state.realEstateAgent === "Yes" ? true : false;
    let userBorder = this.state.userFocused ? "blue" : "gray";
    let emailBorder = this.state.emailFocused ? "blue" : "gray";
    let phoneBorder = this.state.phoneFocused ? "blue" : "gray";
    let agentBorder = this.state.agentFocused ? "blue" : "gray";

    return (
      <View style={this.props.styles.signupContainer}>
        <ScrollView bounces={false}>
          <View style={this.props.styles.titleContainer}>
            <CustomText font="milkshake" style={this.props.styles.headerText}>
              Welcome
            </CustomText>
            <CustomText style={this.props.styles.subHeaderText}>
              Please Sign in
            </CustomText>
          </View>
          <View style={this.props.styles.innerContainer}>
            <CustomText>Name</CustomText>
            <TextInput
              style={[this.props.styles.input, { borderColor: userBorder }]}
              onFocus={() => this.onFocus("user")}
              onBlur={() => this.onBlur("user")}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
          </View>
          <View style={this.props.styles.innerContainer}>
            <CustomText>E-mail Address</CustomText>
            <TextInput
              style={[this.props.styles.input, { borderColor: emailBorder }]}
              onFocus={() => this.onFocus("email")}
              onBlur={() => this.onBlur("email")}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>
          {this.props.questions.phoneQ ? (
            <View style={this.props.styles.innerContainer}>
              <CustomText>Phone Number</CustomText>
              <TextInput
                style={[this.props.styles.input, { borderColor: phoneBorder }]}
                onFocus={() => this.onFocus("phone")}
                onBlur={() => this.onBlur("phone")}
                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                value={this.state.phoneNumber}
              />
            </View>
          ) : null}
          {this.props.questions.agentQ ? (
            <View style={this.props.styles.realEstateContainer}>
              <CustomText>
                Are you currently working with a Real Estate Agent?
              </CustomText>
              <View
                style={{
                  marginTop: "5%",
                  flexDirection: "column",
                  flex: 1,
                  width: "100%"
                }}
              >
                <View style={{ marginBottom: "5%" }}>
                  <SegmentedControls
                    options={options}
                    onSelection={selectedOption =>
                      this.setState({ realEstateAgent: selectedOption })
                    }
                    selectedOption={this.state.realEstateAgent}
                  />
                </View>
                <TextInput
                  editable={agent}
                  keyboardType="numeric"
                  maxLength={10}
                  style={[
                    this.props.styles.input,
                    {
                      backgroundColor: agent ? "white" : "darkgray",
                      borderColor: agentBorder
                    }
                  ]}
                  onFocus={() => this.onFocus("agent")}
                  onBlur={() => this.onBlur("agent")}
                  onChangeText={agentName => this.setState({ agentName })}
                  value={this.state.agentName}
                />
              </View>
            </View>
          ) : null}
          {this.props.questions.suggestQ ? (
            <View
              style={[
                this.props.styles.innerContainer,
                { flexDirection: "row" }
              ]}
            >
              <CheckBox
                label=""
                checked={this.state.checked}
                value={true}
                onChange={() => this.setState({ checked: !this.state.checked })}
                checkboxStyle={{
                  backgroundColor: "white",
                  borderColor: "#DDDDDD"
                }}
                containerStyle={{ marginRight: "2%" }}
              />
              <CustomText>
                Would you be interested in seeing other properties like this
                one?
              </CustomText>
            </View>
          ) : null}
          {this.props.questions.sourceQ ? (
            <View style={this.props.styles.innerContainer}>
              <Dropdown
                label="Where did you hear about this open house?"
                value="Select One"
                onChangeText={value => this.setState({ source: value })}
                data={data}
              />
            </View>
          ) : null}
          <TouchableOpacity
            style={this.props.styles.button}
            onPress={() => this.onSubmit()}
          >
            <CustomText style={{ color: "white" }} font="bold">
              SUBMIT
            </CustomText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    property: state.property,
    openHouse: state.openHouse,
    questions: state.questions
  };
};

export default connect(mapStateToProps, {addLead})(SignUpForm);
