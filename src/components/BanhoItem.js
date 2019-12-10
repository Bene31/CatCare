import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { LineImage, LineText, Text, FakeImage } from "../styles/style";


const BanhoItem = (props) => {
    const { data, img, onPress } = props;

    function renderImage(img){
        console.log('img',img);
        if (!img) {
            return <FakeImage flexSize='1'><Text fontSize='30px'>B</Text>
            </FakeImage> 
        }
        return  <LineImage flexSize='1' source={{ uri: img }}/>
    }

    return (
        <TouchableOpacity onPress={()=>{
            console.log('Clicou em mim', data);
            onPress();
            }}>   
            <View style={styles.line}>
                { renderImage (img) }
                <LineText flexSize='7'>{data}</LineText>
            </View>
        </TouchableOpacity>
    )
}


export default BanhoItem;


const styles = StyleSheet.create({
    line : {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        alignItems: 'center'
    },
})
