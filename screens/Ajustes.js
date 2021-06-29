import React from 'react';
import { StyleSheet, Switch, FlatList, Platform, TouchableOpacity, View } from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";

import materialTheme from '../constants/Theme';

export default class Settings extends React.Component {
  state = {};

  toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const {navigate} = this.props.navigation;

    switch(item.type) {
      case 'switch': 
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
              thumbColor={Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null}
              trackColor={{ false: materialTheme.COLORS.SWITCH_OFF, true: materialTheme.COLORS.SWITCH_ON }}
              value={this.state[item.id]}
            />
          </Block>
        );
      case 'button': 
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate('')}>
              <Block row middle space="between" style={{paddingTop:7}}>
                <Text size={14}>{item.title}</Text>
                <Icon name="angle-right" family="font-awesome" style={{ paddingRight: 5 }} />
              </Block>
            </TouchableOpacity>
          </Block>);
      default:
        break;
    }
  }

  render() {
    const recommended = [
      { title: "Usar TouchID para entrar", id: "face", type: "switch" },
      { title: "Bloqueio Automático", id: "autolock", type: "switch" },
      { title: "Notificações", id: "Notifications", type: "button" },
    ];
    const privacy = [
      { title: "Termo de Acordo do Usuário", id: "Agreement", type: "button" },
      { title: "Privacidade", id: "Privacy", type: "button" },
      { title: "Sobre", id: "About", type: "button" },
    ];

    return (
      <View
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}>
        <FlatList
          data={recommended}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          ListHeaderComponent={
            <Block style={styles.title}>
              <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
                Configurações recomndadas
              </Text>
              <Text center muted size={12}>
                Estas são as configurações mais importantes
              </Text>
            </Block>
          }
        />

        <Block style={styles.title}>
          <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
            Condigurações de Privacidade
          </Text>
          <Text center muted size={12}>
            Segunda configuração mais importante
          </Text>
        </Block>
        <FlatList
          data={privacy}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  }
});
