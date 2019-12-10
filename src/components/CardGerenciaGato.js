import React from 'react';
import { Container, Cover, Image, Content, Title, PriceCaption, FakeImage, Text } from "../styles/style";


const CardGerenciaGato = (props) => { 
    const {id, nome, img} = props;

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
                <Title>{nome}</Title>
            </Content>
        </Container>
    )
};

export default CardGerenciaGato;