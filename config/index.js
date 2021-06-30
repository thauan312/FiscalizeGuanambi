import React, { Component } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class Publi extends Component{
  render(){
    return(
      <View>
        <Image style={styles.imagePubli} souce={{uri: this.props.data.file}} />
        <Text style={styles.nomePubli}>{this.props.data.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{

  },
  nomePubli:{
    fontSize: 18,
  },
  imagePubli:{
      width: 110,
      height: 150,
  },


});