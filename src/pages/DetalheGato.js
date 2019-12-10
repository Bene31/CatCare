import React, { Component } from 'react';
import { Image, ActivityIndicator, Text, Button } from 'react-native';

import { View, ScrollView } from "../styles/style";
import Card from "../components/Card";

import Firebase from '../database/Firebase';

export default class DetalheGato extends Component {
 
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
      //navigation.goBack();
	  navigation.navigate('Lista');
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
          <Card id={this.state.content.id} img={this.state.content.img}
                nome={this.state.content.nome} raca={this.state.content.raca}
				pelo={this.state.content.pelo} sexo={this.state.content.sexo}
				peso={this.state.content.peso} idade={this.state.content.idade}
				/>
          <View marginTop="200px" paddingLeft="5px" paddingTop="30px" paddingRight="5px" >
            <Button
              title='Editar'
              onPress={() => {
                this.props.navigation.navigate('AddGato', {
                  id: `${this.state.id}`, title: 'Editar'
                });
              }} />
          </View>
          <View marginTop="10px" paddingLeft="5px" paddingTop="20px" paddingRight="5px" >
            <Button
              title='Apagar'
              onPress={() => this.deleteContent(this.state.id)} />  
          </View>
      </ScrollView>
    );
  }
}

