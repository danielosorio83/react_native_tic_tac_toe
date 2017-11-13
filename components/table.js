import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Board from './board.js'

function init_state(){
  let turns = ['X', 'O'];
  let turn = turns[Math.floor(Math.random() * turns.length)];
  return {
    table: Array(9).fill(null),
    turn: turn,
    status: `Turn of ${turn}`,
    ended: false,
    winner: []
  }
}

function calculateWinner(table) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (table[a] && table[a] === table[b] && table[a] === table[c]) {
      return lines[i];
    }
  }
  return [];
}

function finished(table){
  let empties = table.filter((c) => { return !c; });
  return empties.length === 0;
}

export default class Table extends Component {
  constructor(props){
    super(props);
    this.state = init_state();
  }

  activeClick(i) {
    let { table, turn, status, ended, winner } = this.state;
    if (table[i] || ended) { return; }
    table[i] = turn;
    [ended, winner] = this.ended(table);
    turn = (turn === 'X') ? 'O' : 'X';
    status = this.getStatus(ended, turn, winner);
    this.setState({table, turn, status, ended, winner});
  }

  ended(table) {
    let ended = finished(table);
    let winner = calculateWinner(table);
    ended = (ended || winner.length > 0);
    return [ended, winner];
  }

  getStatus(ended, turn, winner){
    if (ended){
      if (winner.length > 0){
        return `Winner ${this.state.turn}`;
      }else{
        return 'DRAW';
      }
    }else{
      return `Turn of ${turn}`
    }
  }

  resetTable(){
    this.setState(init_state());
  }

  renderReset(){
    if (!this.state.ended) { return; }
    return (
      <TouchableHighlight onPress={this.resetTable.bind(this)}>
        <View>
          <Text style={styles.reset}>Reset</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Board table={this.state.table} activeClick={i => this.activeClick(i)} status={this.state.status} winner={this.state.winner} />
        {this.renderReset()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reset: {
    backgroundColor: '#da4f49',
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    top: 400,
    zIndex: 10
  }
})
