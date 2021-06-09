import * as React from 'react';
import { View, StyleSheet, Dimensions, TextInput, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import { Images, materialTheme } from '../constants/';
const { height, width } = Dimensions.get('screen');
import { HeaderHeight } from "../constants/utils";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default class Pro extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      detalhes:'',
    }
  }

render() {
  const GOOGLE_PLACES_API_KEY = 'AIzaSyDCADpmxm04-VSWGyCK7knDXe7sBxYhcWo'; // never save your real api key in a snack!
  const { navigation } = this.props;
  
  return (
    <View style={styles.container}>
      <Text color="#000" size={30}>Cadastrar post</Text>
            
      <Text size={20} color='#000'>
        Qual a localização?
      </Text>
      <GooglePlacesAutocomplete
        placeholder="Qual a localização?"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'pt-br',
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }}
        />
  
        <Button
          shadowless
          style={styles.button}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={() => { navigation.navigate('Início'); alert("Publicação realizada com sucesso!")}}
          //onPress={() => navigation.navigate('LocalPost')}
          >
          AVANÇAR
        </Button>  
    </View>
    
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    marginHorizontal: 10,
    backgroundColor: "#F5F5F5",
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  button: {
    marginTop: 55,
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
