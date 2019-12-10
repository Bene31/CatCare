import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, TextInput, Button, Text, Picker } from 'react-native';
import Firebase from '../database/Firebase';

import { ScrollView, ActivityView, ContainerView, View } from "../styles/style";

export default class CadastroVacina extends Component {
  
  constructor() {
    super();
    this.state = {
      id: '',
      nome: '',
	  dataVacina: '',
	  dataRevacinar: '',
      isLoading: false,
    }; 
  }

  componentDidMount() {

    const id  = this.props.navigation.getParam('id');

    console.log('EDIT id', id);

    if ( id !== "0" ) {
        this.setState({isLoading: true});

        console.log('edição');      

        const ref = Firebase.firestore().collection('contents').doc(JSON.parse(id)).collection('vacinas');
        ref.get().then((doc) => {
          if (doc.exists) {
            console.log("Documento  encontrado");
            const content = doc.data();
            this.setState({
              id: id,
              nome: content.nome,
              dataVacina: content.dataVacina,
              dataRevacinar: content.dataRevacinar,
              isLoading: false
             });
             
          } else {
            console.log("Documento não encontrado");
          }
        });
       
      }
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  } 
  
  saveContent() {
    const id  = this.props.navigation.getParam('id');

    console.log('salvar id', id);
    
    this.setState({
      isLoading: true,
    });
    
    const data = {
      id: this.state.id,
      nome: this.state.nome,
      dataVacina: this.state.dataVacina,
      dataRevacinar: this.state.dataRevacinar,
    }
    
    if ( id !== "0" ) {

      console.log('update id', id);

      const updateRef = Firebase.firestore().collection('contents').doc(JSON.parse(id)).collection('vacinas');
      updateRef.set({
        nome: this.state.nome,
        dataVacina: this.state.dataVacina,
        dataRevacinar: this.state.dataRevacinar,
      }).then((docRef) => {
        this.props.navigation.navigate("Vacina");        
      })
      .catch((error) => {
        console.error("Erro atualizando documento: ", error);
      });
          
    } else {

      console.log('add id', id);  

      const saveRef = Firebase.firestore().collection('contents').doc(JSON.parse(id)).collection('vacinas');
      saveRef.add({
        nome: this.state.nome,
        dataVacina: this.state.dataVacina,
        dataRevacinar: this.state.dataRevacinar,
      }).then((docRef) => {
        this.props.navigation.navigate("Vacina");
      })
      .catch((error) => {
        console.error("Erro adicionando o documento: ", error);
      });
    }    
    this.setState({
        isLoading: false,
    });
  }
  
  render() {
    if(this.state.isLoading){
      return(
          <ActivityIndicator size="large" color="#0000ff" />
      )
    }
    return (
      <ScrollView>
        <ContainerView>
          <TextInput
              placeholder={'Nome da Vacina'}
              value={this.state.nome}
              onChangeText={(text) => this.updateTextInput(text, 'nome')}
          />
        </ContainerView>
        <ContainerView>
          <TextInput
              placeholder={'Data da Vacinar'}
              value={this.state.dataVacina}
              onChangeText={(text) => this.updateTextInput(text, 'dataVacina')}
          />
        </ContainerView>
        <ContainerView>
          <TextInput
              placeholder={'Data para Revacinar'}
              value={this.state.dataRevacinar}
              onChangeText={(text) => this.updateTextInput(text, 'dataRevacinar')}
          />
        </ContainerView>
        
        <View marginTop="20px" paddingLeft="5px" paddingTop="10px" paddingRight="5px" >
          <Button
            title='Salvar'
            onPress={() => this.saveContent()} />
        </View>
        <View marginTop="20px" paddingLeft="5px" paddingTop="10px" paddingRight="5px" >
          <Button
            title='Cancelar'
            onPress={() => this.props.navigation.navigate("Vacina")} />
        </View>
      </ScrollView>
    );
  }
  
}


const styles = StyleSheet.create({
  

})