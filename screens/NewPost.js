import React from 'react';
import { Pressable, View, StyleSheet, Dimensions } from 'react-native';
import {  Button, Text, Input, } from 'galio-framework';

import { materialTheme } from '../constants/';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react';
import ImagePickerModal from '../components/ImagePicker';
import { Alert } from 'react-native';
import API from '../services/api'

export default function Pro({ navigation }) {
  const [claimsData, setClaimsData] = useState({});
  const [step, setStep] = useState(0)
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmitStep1() {
    setLoading(true);
    validateFields();
  }

  function validateFields() {
    const { title, description, file } = claimsData;

    if (!title || !description || !file) {
      Alert.alert("Oops!", "Campos inválidos, preencha todos os campos.");
      setLoading(false)
      return
    }

    nextStep();
  }

  function nextStep() {
    setLoading(false);
    setStep(1)
  }

  function handleSubmitStep2() {
    setLoading(true);
    validateFields2();
  }

  function validateFields2() {
    const { address } = claimsData;

    if (!address) {
      Alert.alert("Oops!", "Campos inválidos, preencha todos os campos.");
      setLoading(false)
      return
    }

    mountData();    
  }

  function mountData() {
    const { file, ...rest } = claimsData;

    const newData = { ...rest, media: file}

    saveClaim(newData);
  }

  function saveClaim(data) {
    API.post('/claims/create', data)
      .then(({data}) => {
        if (!data.success) {
          Alert.alert("Oops!", data.message);
          setLoading(false);
          return
        }

        Alert.alert(
          "Sucesso!",
          'Reclamação criada com sucesso', 
          [{}, { text: "OK", onPress: () => {
            setClaimsData({});
            setStep(0);
            setLoading(false);
          }}]);
      })
      .catch(() => {
        Alert.alert("Oops!", 'Houve uma falhada inesperada, contate o suporte.');
        setLoading(false)
      });
  }

  return (
    <>
      <View style={styles.container}>
        {step === 0 && (
          <>
            <View>
              <Text color="#000" size={30}>Cadastrar post</Text>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text size={20} color='#000'>Dê um titulo</Text>

              <Input
                color="black"
                placeholder="Titulo"
                onChangeText={title => setClaimsData({ ...claimsData, title })}
              />
            </View>

            <View style={{ marginTop: 16 }}>
              <Text size={20} color='#000'>Dê mais detalhes</Text>

              <Input
                color="black"
                placeholder="Descrição"
                onChangeText={description => setClaimsData({ ...claimsData, description })}
              />
            </View>

            <Pressable
              style={styles.uploadImage}
              onPress={() => setShowImagePicker(true)}
            >
              <Text style={styles.uploadImageText}>
                {claimsData.file ? 'Arquivo enviado' : 'Escolha um bom arquivo'}
              </Text>
            </Pressable>

            <View style={{ marginTop: 25 }}>
              <Button
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                shadowless
                onPress={() => handleSubmitStep1()}
              >
                {loading ? 'Aguarde...' : 'Avançar'}
              </Button>
            </View>      
          </>
        )}

        {step === 1 && (
          <>
            <Text size={20} color='#000' style={{ marginBottom: 16 }}>
              Qual a localização?
            </Text>

            <GooglePlacesAutocomplete
              query={{
                key: 'AIzaSyDCADpmxm04-VSWGyCK7knDXe7sBxYhcWo',
                language: 'cs',
                components: 'country:br'
              }}
              onFail={(error) => console.error(error)}
              onPress={(data, details = null) => {
                setClaimsData({ ...claimsData, address: data.description })
              }}
            />

            <Button
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              shadowless
              disabled={loading}
              onPress={() => handleSubmitStep2()}
            >
              {loading ? 'Aguarde...' : 'Salvar'}
            </Button>
          </>
        )}
      </View>

      <ImagePickerModal
        modalVisible={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onSetClaimsData={(file) => setClaimsData({ ...claimsData, file })}
      />
    </>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: "#F5F5F5",
  },
  button: {    
    width: '100%',
    margin: 0,
  },
  uploadImage: {
    width: '100%',
    height: 50,
    marginTop: 16,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6
  },
  uploadImageText: {
    fontSize: 16,
    fontWeight: '700'
  }
});