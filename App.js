/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

var URL = 'https://api.nasa.gov/planetary/apod?api_key=';
var ApiKey = 'Aw0cF53hLylw1nCrbMe3aTQqiYHcTQPHGy9FuhQX';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      isSubmitButtonDisable: true,
      responseData: '',
      responseCode: '',
      responseMsg: '',
      responseDate: '',
      responseServiceVersion: '',
      isResponseDataShowed: false,
    };
  }

  componentDidMount() {}
  render() {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            height: 40,
            width: '70%',
          }}
          placeholder={'Enter Asteroid id'}
          autoCorrect={false}
          onChangeText={(asteroidID) => this.textInput(asteroidID)}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            disabled={this.state.isSubmitButtonDisable}
            onPress={() => this.clickedSubmitButton()}>
            <View
              style={{
                height: 40,
                borderColor: '#D3D3D3',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 140,
                marginTop: 10,
                marginRight: 10,
              }}>
              <Text>Submit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.clickedRandomButton()}>
            <View
              style={{
                height: 40,
                borderColor: '#D3D3D3',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 140,
                marginTop: 10,
                marginLeft: 10,
              }}>
              <Text>Random Asteroid</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.isResponseDataShowed === true ? (
          <View style={{marginTop: 10}}>
            <Text>ResponseCode :- {this.state.responseCode}</Text>
            <Text>Message :- {this.state.responseMsg}</Text>
            {/* <Text>Date :- {this.state.responseDate}</Text> */}
            <Text>Service Version :- {this.state.responseServiceVersion}</Text>
          </View>
        ) : null}
      </View>
    );
  }

  textInput(text) {
    this.setState({isSubmitButtonDisable: false});
  }
  clickedSubmitButton() {
    // alert('Submit');
    this.callApi();
  }

  clickedRandomButton() {
    // alert('Random');
    this.callApi();
  }

  callApi() {
    fetch(URL + ApiKey)
      .then((response) => response.json())
      .then((json) => {
        // alert(JSON.stringify(json.msg));
        this.setState({
          responseCode: json.code,
          responseMsg: json.msg,
          // responseDate: json.date,
          responseServiceVersion: json.service_version,
          isResponseDataShowed: true,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }
}

// export default App;
