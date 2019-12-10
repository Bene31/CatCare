import React from 'react';
import { Container, Cover, Image, Content, Title, PriceCaption, FakeImage, Text } from "../styles/style";


const CardVacina = (props) => { 
    const {id, nome, dataVacina, dataRevacina, img} = props;

    function renderImage(img){
        console.log('img',img);
        if (!img) {
            return <FakeImage marginLeft='0px' flexSize='1'><Text fontSize='30px'>V</Text>
            </FakeImage> 
        }
        return <Image source={{ uri: img }}/>
    }

    return (

        <Container>
            <Cover>
                { renderImage(img) }
            </Cover>
            <Content>
                <Text>Nome: <Title>{nome}</Title></Text>
                <Text>DataVacina: <Title>{dataVacina}</Title></Text>
                <Text>DataRevacina: <Title>{dataRevacina}</Title></Text>
            </Content>
        </Container>
    )
};

export default CardVacina;