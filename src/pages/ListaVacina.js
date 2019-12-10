import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import VacinaItem from '../components/VacinaItem';
import { Fab, Text, View } from "../styles/style";

import Firebase from '../database/Firebase';


class ListaVacina extends React.Component {

  constructor(props) {
    super(props);
	
	const id = this.props.navigation.getParam('id');

    console.log('DETAIL id', id);

    this.ref = Firebase.firestore().collection('contents').doc(JSON.parse(id)).collection('vacinas');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      vacinas: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onContentUpdate);
	
  }
  
  onContentUpdate = (querySnapshot) => {
    const vacinas = [];
    querySnapshot.forEach((doc) => {
      const { nome, dataVacina, dataRevacina/*, idGato */} = doc.data();
      vacinas.push({
        id: doc.id,
        vacinas, // DocumentSnapshot
        nome,
        dataVacina,
        dataRevacina, 
		//idGato,
      });
    });
    this.setState({
      vacinas,
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
          this.props.navigation.navigate('AddVacina', {
           id: "0", title: 'Adicionar Vacina'})} 
          }
          >
        <Text color='white' fontSize='30px'>+</Text>
      </Fab>
    )
  }

  render(){

    const { vacinas } = this.state;
    
    { this.renderActivityIndicator() }

    if(vacinas.length === 0){
      return(
        <View>
          <Text>{this.state.notFound}</Text>
          { this.renderFAB() }
        </View>
      )
    }

    const items = vacinas.map((content, index) =>
      <VacinaItem key={index} nome={content.nome} dataVacina={'data de vacinação:' + content.dataVacina} 
	  dataRevacina={'data de revacinação:' + content.dataRevacina}img={content.img} onPress={() => {
        this.props.navigation.navigate('VacinaDetail', {
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
export default ListaVacina;
  