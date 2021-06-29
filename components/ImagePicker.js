import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View, Pressable } from "react-native";
import { Text } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';

function ImagePickerModal({ modalVisible, onClose, onSetClaimsData }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissões da câmera para fazer isso funcionar!');
        }
      }
    })();
  }, []);

  async function choseGalery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      let prefix;
      let ext;

      if (result.fileName) {
        [prefix, ext] = result.fileName;
        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
      } else {
        prefix = new Date().getTime();
        ext = 'jpg'
      }

      const data = {
        type: result.type,
        name: `${prefix}`,
        ext,
        file: result.base64
      }
      
      onSetClaimsData(data);
      onClose();
    }
  }

  return (
    <Modal
      visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => onClose()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.modalButtons}
              onPress={() => choseGalery()}
            >
              <Text style={styles.modalButtonsText}>Selecionar da galeria</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButtons: {
    width: '100%'
  },
  modalButtonsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#cecece'
  }
});

export default ImagePickerModal;