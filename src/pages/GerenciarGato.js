import React, { Component } from 'react';
import { Image, ActivityIndicator, Text, Button } from 'react-native';

import { View, ScrollView } from "../styles/style";
import CardGerenciaGato from "../components/CardGerenciaGato";

import Firebase from '../database/Firebase';

export default class GerenciarGato extends Component {
 
  constructor() {
    super();
    this.state = {
      isLoading: true,
      content: {},
      id: '',
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id');

    console.log('DETAIL id', id);

    const ref = Firebase.firestore().collection('contents').doc(JSON.parse(id));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          content: doc.data(),
          id: id,
          isLoading: false
        });
      } else {
        console.log("Documento não foi encontrado");
      }
    });
  }
  
  deleteContent(id) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    
    Firebase.firestore().collection('contents').doc(id).delete().then(() => {
      console.log("Documento apagado");
      this.setState({
        isLoading: false
      });
      navigation.goBack();
    }).catch((error) => {
      console.error("Erro apagando o documento ", error);
      this.setState({
        isLoading: false
      });
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
          <CardGerenciaGato id={this.state.content.id} img={this.state.content.img}
                nome={this.state.content.nome} 
		  />
		  
		  <View marginTop="10px" paddingLeft="5px" paddingTop="10px" paddingRight="5px" >
            <Button
              title='Vacinas'
              onPress={() => {
                this.props.navigation.navigate('Vacina', {
                  id: `${this.state.id}`, title: 'Vacinas do Gato'
                });
              }} />
          </View>
		  
		  <View marginTop="10px" paddingLeft="5px" paddingTop="10px" paddingRight="5px" >
            <Button
              title='Bem Estar'
              onPress={() => {
                this.props.navigation.navigate('Banho', {
                  id: `${this.state.id}`, title: 'Bem Estar do Gato'
                });
              }} />
          </View>
		  
          <View marginTop="10px" paddingLeft="5px" paddingTop="10px" paddingRight="5px" >
            <Button
              title='Detalhes'
              onPress={() => {
                this.props.navigation.navigate('Detalhe', {
                  id: `${this.state.id}`, title: 'Detalhes do Gato'
                });
              }} />
          </View>
		  
          <View marginTop="10px" paddingLeft="5px" paddingTop="10px" paddingRight="5px" >
            <Button
              title='Lembrete'
              onPress={() => {
                this.props.navigation.navigate('Detalhe', {
                  id: `${this.state.id}`, title: 'Lembretes do Gato'
                });
              }} /> 
          </View>
		  
      </ScrollView>
    );
  }
}

