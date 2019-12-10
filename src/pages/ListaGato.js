import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import ContentItem from '../components/ContentItem';
import { Fab, Text, View } from "../styles/style";

import Firebase from '../database/Firebase';


class ListaGato extends React.Component {

  constructor(props) {
    super(props);

    this.ref = Firebase.firestore().collection('contents');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      contents: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onContentUpdate);
  }
  
  onContentUpdate = (querySnapshot) => {
    const contents = [];
    querySnapshot.forEach((doc) => {
      const { nome, raca, pelo, sexo, peso, idade } = doc.data();
      contents.push({
        id: doc.id,
        contents, // DocumentSnapshot
        nome,
        raca,
        pelo, 
		sexo, 
		peso, 
		idade,
      });
    });
    this.setState({
      contents,
      isLoading: false,
   });
  }

  renderActivityIndicator() {
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    } 
  }

  renderFAB() {
    return (
      <Fab onPress={
        () => { 
          this.props.navigation.navigate('AddGato', {
           id: "0", title: 'Cadastro Gato' })} 
          }
          >
        <Text color='white' fontSize='30px'>+</Text>
      </Fab>
    )
  }

  render(){

    const { contents } = this.state;
    
    { this.renderActivityIndicator() }

    if(contents.length === 0){
      return(
        <View>
          <Text>{this.state.notFound}</Text>
          { this.renderFAB() }
        </View>
      )
    }

    const items = contents.map((content, index) =>
      <ContentItem key={index} nome={content.nome} img={content.img} onPress={() => {
        this.props.navigation.navigate('Gerenciar', {
          id: `${JSON.stringify(content.id)}`
        });
      }}
      />
    )

    return (
        <View>
          <ScrollView>
            {items}
          </ScrollView>
          { this.renderFAB() }
        </View>  
      );
  }
}
export default ListaGato;
  