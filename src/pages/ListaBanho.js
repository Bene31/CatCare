import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import BanhoItem from '../components/BanhoItem';
import { Fab, Text, View } from "../styles/style";

import Firebase from '../database/Firebase';


class ListaBanho extends React.Component {

  constructor(props) {
    super(props);

    this.ref = Firebase.firestore().collection('banho');
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
      const { data, desc } = doc.data();
      contents.push({
        id: doc.id,
        contents, // DocumentSnapshot
        data,
        desc,
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
          this.props.navigation.navigate('AddBanho', {
           id: "0", title: 'Cadastro Banho' })} 
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
      <BanhoItem key={index} data={content.data} img={content.img} onPress={() => {
        this.props.navigation.navigate('BanhoDetail', {
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
export default ListaBanho;
  