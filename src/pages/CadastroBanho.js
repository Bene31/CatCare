import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, TextInput, Button, Text, Picker } from 'react-native';
import Firebase from '../database/Firebase';

import { ScrollView, ActivityView, ContainerView, View } from "../styles/style";

export default class CadastroBanho extends Component {
  
  constructor() {
    super();
    this.state = {
      id: '',
      data: '',
	  desc: '',
      isLoading: false,
    }; 
  }

  componentDidMount() {

    const id  = this.props.navigation.getParam('id');

    console.log('EDIT id', id);

    if ( id !== "0" ) {
        this.setState({isLoading: true});

        console.log('edição');      

        const ref = Firebase.firestore().collection('banho').doc(JSON.parse(id));
        ref.get().then((doc) => {
          if (doc.exists) {
            console.log("Documento  encontrado");
            const content = doc.data();
            this.setState({
              id: id,
              data: content.data,
              desc: content.desc,
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
      data: this.state.data,
      desc: this.state.desc,
    }
    
    if ( id !== "0" ) {

      console.log('update id', id);

      const updateRef = Firebase.firestore().collection('banho').doc(JSON.parse(id));
      updateRef.set({
        data: this.state.data,
        desc: this.state.desc,
      }).then((docRef) => {
        this.props.navigation.navigate("Banho");        
      })
      .catch((error) => {
        console.error("Erro atualizando documento: ", error);
      });
          
    } else {

      console.log('add id', id);  

      const saveRef = Firebase.firestore().collection('banho');
      saveRef.add({
        data: this.state.data,
        desc: this.state.desc,
      }).then((docRef) => {
        this.props.navigation.navigate("Banho");
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
              placeholder={'Data'}
              value={this.state.data}
              onChangeText={(text) => this.updateTextInput(text, 'data')}
          />
        </ContainerView>
        <ContainerView>
          <TextInput
              placeholder={'Desc'}
              value={this.state.desc}
              onChangeText={(text) => this.updateTextInput(text, 'desc')}
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
            onPress={() => this.props.navigation.navigate("ListaBanho")} />
        </View>
      </ScrollView>
    );
  }
  
}


const styles = StyleSheet.create({
  

})