import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Table from './components/table.js';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Table />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
