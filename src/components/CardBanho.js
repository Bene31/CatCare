import React from 'react';
import { Container, Cover, Image, Content, Title, PriceCaption, FakeImage, Text } from "../styles/style";


const CardBanho = (props) => { 
    const {id, data, desc, img} = props;

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
                <Text>Data: <Title>{data}</Title></Text>
                <Text>Desc: <Title>{desc}</Title></Text>
            </Content>
        </Container>
    )
};

export default CardBanho;