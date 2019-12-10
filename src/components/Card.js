import React from 'react';
import { Container, Cover, Image, Content, Title, PriceCaption, FakeImage, Text } from "../styles/style";


const Card = (props) => { 
    const {id, nome, raca, pelo, sexo, peso, idade, img} = props;

    function renderImage(img){
        console.log('img',img);
        if (!img) {
            return <FakeImage marginLeft='0px' flexSize='1'><Text fontSize='30px'>C</Text>
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
                <Text>Raça: <Title>{raca}</Title></Text>
                <Text>Pelo: <Title>{pelo}</Title></Text>
                <Text>Sexo: <Title>{sexo}</Title></Text>
                <Text>Peso: <Title>{peso}kg</Title></Text>
                <Text>Idade: <Title>{idade}ano(s)</Title></Text>
            </Content>
        </Container>
    )
};

export default Card;