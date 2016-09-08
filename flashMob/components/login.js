import React, { Component } from 'react';
import { styles } from './styles.js';
import { EventsList } from './events.js';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isLoggedin: false
    };
  }

  handleLogin() {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((res) => {
      if (res.status === 200) {
      //redirect to events page
        this.setState({isLoggedin: true});      
        this.props.navigator.replacePreviousAndPop({
          title: "Events List",
          component: EventsList
        });
      } 
    }).catch((err) => {
      console.log('There is an error. It\'s a sad day D=', err);
    });
  }

//onChangeText will collect text input and set it to state object
  render() {
    return (
        <View style={styles.textInputContainer}>
          <Text style={styles.allText}>Username:</Text>
          <TextInput style={styles.textInput} autoCapitalize='none' onChangeText={(text)=>this.setState({username: text})}/>
          <Text style={styles.allText}>Password:</Text>
          <TextInput secureTextEntry={true} autoCapitalize='none' style={styles.textInput} onChangeText={(text)=>this.setState({password: text})}/>
          <Text></Text>
          <TouchableHighlight style={[styles.button, styles.newButton]} underlayColor='white' onPress={this.handleLogin.bind(this)}>
            <Text style={styles.buttonText}>SEND</Text>
          </TouchableHighlight>
        </View>
      );
  }
}


/*

This file will eventually migrate to events.js

import React, { Component } from 'react';
import { styles } from './styles.js';
import MapView from 'react-native-maps';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Image
} from 'react-native';

export class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      isLoaded: false
    };
  }

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //first params on success
        //position is stringified in doc, not sure if we need it
        //var initialPosition = JSON.stringify(position);
        var initialPosition = position;
        this.setState({initialPosition});
      }, 
      //second params on error
      (err) => console.log('There is an error. It\'s a sad day D=', err),
      //optional param
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = position;
        this.setState({lastPosition});
        this.getNearbyEvents();
        this.setState({isLoaded: true});
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getNearbyEvents() {
    //invoke when user log in, return event near by events
    fetch('http://localhost:3000/api/events', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      query: JSON.stringify({
        latitude: this.state.lastPosition.coords.latitude,
        longitude: this.state.lastPosition.coords.longitude
      })
    }).then((res) => {
      //redirect to events home page
      console.log('got latitude and longitude', this.state.lastPosition.coords.latitude, this.state.lastPosition.coords.longitude);
    }).catch((err) => {
      console.log('There is an error. It\'s a sad day D=', err);
    });
  }

  render() {
    return (
        <View>
          {this.state.isLoaded ? <MapView/> : <Image source={require('./img/loading.gif')}/>}
        </View>
      );
  }
}

*/