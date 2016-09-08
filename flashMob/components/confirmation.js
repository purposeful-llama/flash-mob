import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';

export class Confirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
    this._submit = this._submit.bind(this)
    this._return = this._return.bind(this)
  }

  _submit() {
    this.setState({
      modalVisible: true
    })
    fetch('http://localhost:3000/api/events', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.props.title,
        category: this.props.category,
        dist: this.props.location,
        time: this.props.date,
        description: this.props.description
      })
    });
  }

  _return() {
    this.setState({
      modalVisible: false
    })
    this.props.navigator.popToTop(0)
  }

  render() {
    return (

      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          >
          <TouchableHighlight style={styles.highlight} onPress={this._return}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Thanks, your event has been saved!</Text>
              <Text style={styles.modalText}>Press anywhere to return to events</Text>
            </View>
          </TouchableHighlight>
        </Modal>
        <View style={styles.confirm}>
          <Text style={styles.info}>Your Event Name</Text>
          <Text style={styles.text}>{this.props.title}</Text>
          <Text style={styles.info}>Event Category</Text>
          <Text style={styles.text}>{this.props.category}</Text>
          <Text style={styles.info}>Event Location</Text>
          <Text style={styles.text}>{this.props.location}</Text>
          <Text style={styles.info}>Event Date</Text>
          <Text style={styles.text}>{this.props.date.toDateString()}</Text>
          <Text style={styles.info}>Event Description</Text>
          <Text style={styles.text}>{this.props.description}</Text>
        </View>
        <Text style={styles.lastQ}>Is this information correct?</Text>
        <TouchableHighlight style={styles.bottomBar} onPress={this._submit}> 
          <Text style={styles.footer}>Submit Event</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  highlight: {
    flex: 1
  },
  modalView: {
    marginTop: 22,
    flex: 1,
    justifyContent: 'center'
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20
  },
  lastQ: {
    paddingBottom: 10,
    textAlign: 'center'
  },
  confirm: {
    flex: 1,
    marginTop: 70,
    marginLeft: 20
  },
  info: {
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 20
  },
  text: {
    fontSize: 20,
    marginBottom: 20
  },
  bottomBar: {
    backgroundColor: '#cccccc',
    marginBottom: 0,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row'
  },
  footer: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1
  },
});
