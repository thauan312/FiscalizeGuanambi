import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
const logo1 ='../assets/images/logo.png';

import materialTheme from '../constants/Theme';




export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={require(logo1)}
            style={{width: width, marginTop: -10, height: height, zIndex: 1, }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color='#000' size={50}>Fiscalize Guanambi</Text>
              </Block>

              <Text size={16} color='#000'>
                A tecnologia a favor da população
              </Text>
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => navigation.navigate('App')}>
                Entrar
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
   // position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
