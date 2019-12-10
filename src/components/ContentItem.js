import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { LineImage, LineText, Text, FakeImage } from "../styles/style";


const ContentItem = (props) => {
    const { nome, img, onPress } = props;

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
                { renderImage (img) }
                <LineText flexSize='7'>{nome}</LineText>
            </View>
        </TouchableOpacity>
    )
}


export default ContentItem;


const styles = StyleSheet.create({
    line : {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        alignItems: 'center'
    },
})
