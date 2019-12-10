import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, TextInput, Button, Text, Picker } from 'react-native';
import Firebase from '../database/Firebase';

import { ScrollView, ActivityView, ContainerView, View } from "../styles/style";

export default class CadastroGato extends Component {
  
  constructor() {
    super();
    this.state = {
      id: '',
      nome: '',
	  raca: '',
	  pelo: 'LONGO',
	  sexo: 'MACHO',
	  peso: '',
      idade: '',
      isLoading: false,
    }; 
  }

  componentDidMount() {

    const id  = this.props.navigation.getParam('id');

    console.log('EDIT id', id);

    if ( id !== "0" ) {
        this.setState({isLoading: true});

        console.log('edição');      

        const ref = Firebase.firestore().collection('contents').doc(JSON.parse(id));
        ref.get().then((doc) => {
          if (doc.exists) {
            console.log("Documento  encontrado");
            const content = doc.data();
            this.setState({
              id: id,
              nome: content.nome,
              raca: content.raca,
              pelo: content.pelo,
			  sexo: content.sexo,
              peso: content.peso,
              idade: content.idade,
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
      raca: this.state.raca,
      pelo: this.state.pelo,
	  sexo: this.state.sexo,
      peso: this.state.peso,
      idade: this.state.idade,
    }
    
    if ( id !== "0" ) {

      console.log('update id', id);

      const updateRef = Firebase.firestore().collection('contents').doc(JSON.parse(id));
      updateRef.set({
        nome: this.state.nome,
        raca: this.state.raca,
        pelo: this.state.pelo,
	    sexo: this.state.sexo,
        peso: this.state.peso,
        idade: this.state.idade,
      }).then((docRef) => {
        this.props.navigation.navigate("Lista");        
      })
      .catch((error) => {
        console.error("Erro atualizando documento: ", error);
      });
          
    } else {

      console.log('add id', id);  

      const saveRef = Firebase.firestore().collection('contents');
      saveRef.add({
        nome: this.state.nome,
        raca: this.state.raca,
        pelo: this.state.pelo,
	    sexo: this.state.sexo,
        peso: this.state.peso,
        idade: this.state.idade,
      }).then((docRef) => {
        this.props.navigation.navigate("Lista");
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
              placeholder={'Nome'}
              value={this.state.nome}
              onChangeText={(text) => this.updateTextInput(text, 'nome')}
          />
        </ContainerView>
        <ContainerView>
          <TextInput
              placeholder={'Raca'}
              value={this.state.raca}
              onChangeText={(text) => this.updateTextInput(text, 'raca')}
          />
        </ContainerView>
        <ContainerView>
          <Picker
              selectedValue={this.state.pelo}
              onValueChange={pelo => this.setState({ pelo })}>
              <Picker.Item label='Curto' value='CURTO' />
              <Picker.Item label='Longo' value='LONGO' />
              <Picker.Item label='Pelado' value='PELADO' />
            </Picker>	
        </ContainerView>
		<ContainerView>
          <Picker
              selectedValue={this.state.sexo}
              onValueChange={sexo => this.setState({ sexo })}>
              <Picker.Item label='Macho' value='MACHO' />
              <Picker.Item label='Femea' value='FEMEA' />
            </Picker>
        </ContainerView>
        <ContainerView>
          <TextInput
              placeholder={'Peso'}
              value={this.state.peso}
              onChangeText={(text) => this.updateTextInput(text, 'peso')}
          />
        </ContainerView>
        <ContainerView>
          <TextInput
              placeholder={'Idade'}
              value={this.state.idade}
              onChangeText={(text) => this.updateTextInput(text, 'idade')}
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
            onPress={() => this.props.navigation.navigate("Lista")} />
        </View>
      </ScrollView>
    );
  }
  
}


const styles = StyleSheet.create({
  

})