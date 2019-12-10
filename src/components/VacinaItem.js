import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { LineImage, LineText, Text, FakeImage } from "../styles/style";


const VacinaItem = (props) => {
    const { nome, img, onPress, dataVacina, dataRevacina } = props;

    function renderImage(img){
        console.log('img',img);
        if (!img) {
            return <FakeImage flexSize='1'><Text fontSize='30px'>G</Text>
            </FakeImage> 
        }
        return  <LineImage flexSize='1' source={{ uri: img }}/>
    }

    return (
        <TouchableOpacity onPress={()=>{
            console.log('Clicou em mim', nome);
            onPress();
            }}>   
            <View style={styles.line}>
                <LineText flexSize='7'>{nome}</LineText>
                <LineText flexSize='10'>{dataVacina}</LineText>
                <LineText flexSize='10'>{dataRevacina}</LineText>
            </View>
        </TouchableOpacity>
    )
}


export default VacinaItem;


const styles = StyleSheet.create({
    line : {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        alignItems: 'center'
    },
})
