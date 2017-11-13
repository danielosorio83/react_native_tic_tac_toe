import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default class Board extends Component {
  renderBox(box, i){
    let button_style = [styles.box];
    // if (box){ button_style.push(styles.boxActive); }
    if (this.props.winner.indexOf(i) >= 0){ button_style.push(styles.boxWinner); }
    return (
      <TouchableHighlight key={i} onPress={() => this.props.activeClick(i)}>
        <View>
          <Text style={button_style}>{box}</Text>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.status}</Text>
        <View style={styles.table}>
          { this.props.table.map((box, i) => this.renderBox(box, i)) }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 50,
    fontWeight: 'bold'
  },
  ended: {
    color: '#5cb85c'
  },
  table: {
    marginTop: 50,
    width: 180,
    height: 180,
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    width: 60,
    height: 60,
    padding: 0,
    margin: 0,
    textAlign: 'center',
    fontSize: 50,
    justifyContent: 'center'
  },
  boxWinner: {
    color: '#5cb85c'
  },
});
