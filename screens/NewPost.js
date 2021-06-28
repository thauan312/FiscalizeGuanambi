import * as React from 'react';
import { ImageBackground, Image, View, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme, Input, } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Pro extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      titulo:'',
    }
  }

  calcular = () => {
    console.log(this.state);

  }
  
  render() {
    const GOOGLE_PLACES_API_KEY = 'AIzaSyDCADpmxm04-VSWGyCK7knDXe7sBxYhcWo'; 
    const { navigation } = this.props;

    return (
  
      <View flex style={styles.container}>
        <View flex>
          <View>
            <Text color="#000" size={30}>Cadastrar post</Text>
            
            <Text size={20} color='#000'>
              Dê um titulo
            </Text>
            <Input
              name="titulo"
              onChangeText={(text) => this.state={...this.state,titulo: text}}
              right
              color="black"
              placeholder="Titulo"
            />
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
            <Text size={20} color='#000'>
              Dê mais detalhes
            </Text>
            <Input
              name="detalhes"
              onChangeText={(text) => this.state={...this.state,detalhes: text}}
              right
              color="black"
              placeholder="Descrição"
            />

            <Block flex style={styles.button2}>
            <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => { this.calcular();  navigation.navigate('Addimg')}}
              //onPress={() => navigation.navigate('Pro')}
              >
          
              AVANÇAR
            </Button>
            </Block>
          </View>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: Constants.statusBarHeight + 10,
    marginHorizontal: 10,
    backgroundColor: "#F5F5F5",
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    alignItems: 'center',
  },
  button: {

    width: width - theme.SIZES.BASE * 3,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  button2: {
    flexDirection: 'column-reverse',
  }
});