import React from 'react';
import { Button, Text, ActivityIndicator, Alert } from 'react-native';
import firebase from 'firebase';
import { View, TextInput } from "../styles/style";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      pass:'',
      message: '',
      isLoading: false,
    }
  }

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyDHM_im-erbsPVgQOWSQ_j-l1KJPuzdD1k",
      authDomain: "cadastro-f48eb.firebaseapp.com",
      databaseURL: "https://cadastro-f48eb.firebaseio.com",
      projectId: "cadastro-f48eb",
      storageBucket: "",
      messagingSenderId: "234844262067"
    };
    firebase.initializeApp(config);
  }

 onChangeMail(value) {
//  console.log(value);
    this.setState({
      mail: value
    })
 }

 onChangePass(value) {
//  console.log(value);
  this.setState({
    pass: value
  }) 
} 

renderMessage() {
  return(
    <Text> { this.state.message } </Text>
  )
}

renderButton(){
  if (this.state.isLoading) 
    return <ActivityIndicator/>

  return  <Button 
            title="Entrar"
            onPress={()=> this.tryLogin()}/>
}
 tryLogin() {
  // console.log(this.state);
  this.setState({ isLoading: true})

   const { mail, pass } = this.state
   const { navigation } = this.props

//promisse
   firebase.auth().signInWithEmailAndPassword(mail, pass)
   .then( user => {
  //   console.log('usuário autenticado com sucesso ', user)
       this.setState({ message: 'Sucesso'})
       navigation.navigate("Content");
   })
   .catch( error => {
    //  console.log('deu ruim ', error)
       if (error.code === 'auth/user-not-found') {
         Alert.alert('Não cadastrado',
         'Deseja cadastrar um novo usuário?', 
         [
          {
            text: 'Sim',
            onPress: () => {
              firebase.auth().createUserWithEmailAndPassword(mail, pass)
              .then(user => {
                this.setState({ message: 'Sucesso'}) 
              })
              .catch(error => {
                this.setState({ message: error.code }) 
              })
            }
          }, 
          {
           text: 'Não',
           onPress: () => {console.log('Usuário não quer criar conta')}
         }])
       }
   })
   .finally(()=> this.setState({ isLoading: false}))

 }

  render(){
    return (
      <View marginTop="20px">
        <TextInput 
                    placeholder="user@email.com"
                    onChangeText={(value)=>this.onChangeMail(value)}/>
        <TextInput  
                    placeholder="******"
                    secureTextEntry
                    onChangeText={(value)=>this.onChangePass(value)}/>
        <View marginTop="20px" paddingLeft="5px" paddingTop="10px" paddingRight="5px" >
         { this.renderButton() }
         </View>
         { this.renderMessage() }   
      </View>
    );
  }
}


export default Login;