import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Image } from 'expo-image'
// NUNCA REACT NATIVE WEB !!!!

export default function App() {
  // variáveis em React Native são estados / states
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    uf: "",
    localidade: "",
  });

  async function buscaCep() {
    console.log(cep);
    return fetch(
      `https://viacep.com.br/ws/${cep}/json/`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      } // é o objeto de opções que especifica o método HTTP da requisição (GET) e os cabeçalhos que indicam o tipo de conteúdo que a requisição aceita e envia (application/json).

    )
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setEndereco(
          {
            logradouro: data.logradouro,
            uf: data.uf,
            localidade: data.localidade,
          }
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <View style={style.container}>
      <View style={style.containerPadding}>

        <Image
          source={require("./assets/logo.jpg")}
          style={
            {
              width: 200,
              height: 200,
              alignSelf: 'center',
              borderRadius: 100,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },

            }
          }
        />

        <Text style={style.h1} >Busca CEP</Text>
        <Text style={style.h2} >Encontre o endereço pelo CEP</Text>
        <TextInput
          value={cep} // valor do input
          onChangeText={setCep} // função que atualiza o valor do input
          maxLength={8} // tamanho máximo do input
          inputMode="numeric" // tipo do teclado
          placeholder="Digite o CEP" // texto de placeholder
          style={style.inputText} // estilo do input
          onBlur={buscaCep}
        />
        <TextInput
          style={style.inputText}
          value={endereco.logradouro}
          placeholder="Rua / Logradouro"
        />
        <TextInput
          style={style.inputText}
          value={endereco.localidade}
          placeholder="Cidade"
        />
        <TextInput
          style={style.inputText}
          value={endereco.uf}
          placeholder="Estado"
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create(
  {
    h1: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',

    },
    container: {
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#CCC',
    },
    containerPadding: {
      padding: 20,
      alignSelf: 'stretch',
      backgroundColor: '#FFF',
      borderRadius: 20,
      marginHorizontal: 20,
    },
    inputText: {
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 5,
      padding: 10,
      alignSelf: 'stretch',
    }
  }
)