import React, { Component } from 'react';
import { Image, ActivityIndicator, Text, Button } from 'react-native';

import { View, ScrollView } from "../styles/style";
import CardBanho from "../components/CardBanho";

import Firebase from '../database/Firebase';

export default class DetalheBanho extends Component {
 
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

    const ref = Firebase.firestore().collection('banho').doc(JSON.parse(id));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          content: doc.data(),
          id: doc.id,
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
    
    Firebase.firestore().collection('banho').doc(id).delete().then(() => {
      console.log("Documento apagado");
      this.setState({
        isLoading: false
      });
      //navigation.goBack();
	  navigation.navigate('Banho');
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
          <CardBanho id={this.state.content.id} img={this.state.content.img}
                data={this.state.content.data} desc={this.state.content.desc}
				/>
          <View marginTop="200px" paddingLeft="5px" paddingTop="30px" paddingRight="5px" >
            <Button
              title='Editar'
              onPress={() => {
                this.props.navigation.navigate('AddBanho', {
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

