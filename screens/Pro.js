import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";

export default class Pro extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      detalhes:'',
    }
  }
  calcular = () => {
    console.log(this.state.detalhes);
  }
  
  
  render() {
    const { navigation } = this.props;

    return (
  
      <Block flex style={styles.container}>
        <Block flex>
          <Block>
            <Text color="#000" size={30}>Cadastrar post</Text>
            
            <Text size={20} color='#000'>
              Dê mais detalhes
            </Text>
            <Input
              name="detalhes"
              onChangeText={(text) => this.setState({detalhes:text})}
              right
              color="black"
              placeholder="Descrição"
            />
            <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => { this.calcular();  navigation.navigate('Addimg')}}
              //onPress={() => navigation.navigate('LocalPost')}
              >
              AVANÇAR
            </Button>
          </Block>
        </Block>
      </Block>
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
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
