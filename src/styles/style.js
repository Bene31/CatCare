import styled from "styled-components/native";

export const View = styled.View`
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #ffffff;
    margin-top: ${props => props.marginTop || 0};
    padding-left: ${props => props.paddingLeft || 0};
    padding-right: ${props => props.paddingRight || 0};
    padding-top: ${props => props.paddingTop || 0};
`;

export const ContainerView = styled.View`
    flex: 1;
    margin-bottom: 20px;
    padding: 5px;
    border-bottom-width: 2px;
    border-bottom-color: #CCCCCC;
  }
`;

export const TextInput = styled.TextInput`
    border-color: #000000;
    border-bottom-width: 1px;
    padding-bottom: 10px;
    padding-right: 5px;
    padding-left: 5px;
    font-size: 30px;
`;

export const Text = styled.Text`
    font-size: ${props => props.fontSize || '20px' }; 
    color: ${props => props.color || 'black' };
`;

export const Fab = styled.TouchableOpacity` 
    height: 50px;
    width: 50px;
    border-radius: 200px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    justify-content: center;
    align-Items: center;
    background-color: #06f;
`;

export const FakeImage = styled.TouchableOpacity` 
    height: 50px;
    width: 50px;
    border-radius: 200px;
    justify-content: center;
    align-items: center;
    background-color: #06f;
    flex: ${props => props.flexSize || 1 };
    margin-left: ${props => props.marginLeft || '15px' };
`;

export const Lines = styled.View`
    height: 60px;
    border-bottom-width: 1px;
    border-bottom-color: black;
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
`;

export const LineText = styled(Text)`
    flex: ${props => props.flexSize || 1 };
    margin-left: ${props => props.marginLeft || '15px' };
`;

export const LineImage = styled.Image`
    flex: ${props => props.flexSize || 1 };
    margin-left: ${props => props.marginLeft || '15px' };
    border-radius: 50px;
    width: 100%;
    height: 80%;
`;

export const ScrollView = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const Activity = styled.View`
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px
    align-items: center;
    justify-content: center;
  }
`;

export const Container = styled.View`
    background: #fff;
    top: 0px;
    left: 0px;
	height: 200px;
	width: 100%;
	border-radius: 14px;
    justify-content: center;
    align-items: center;
`;

export const Cover = styled.View`
	width: 100%;
	height: 120px;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
    overflow: hidden;
    align-items: center;
    justify-content: center;

`;

export const Image = styled.Image`
	width: 100%;
	height: 100%;
`;

export const Content = styled.View`
	padding-top: 10px;
	flex-direction: column;
	align-items: center;
	height: 60px;
`;

export const Title = styled.Text`
	color: #3c4560;
	font-size: 20px;
	font-weight: 600;
`;

export const PriceCaption = styled.Text`
	color: #b8b3c3;
	font-size: 15px;
	font-weight: 600;
	margin-top: 4px;
`;
