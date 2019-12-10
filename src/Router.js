import ListaGato from './pages/ListaGato';
import DetalheGato from './pages/DetalheGato';
import CadastroGato from './pages/CadastroGato';
import GerenciarGato from './pages/GerenciarGato';
import ListaVacina from './pages/ListaVacina';
import CadastroVacina from './pages/CadastroVacina';
import DetalheVacina from './pages/DetalheVacina';
import CadastroBanho from './pages/CadastroBanho';
import ListaBanho from './pages/ListaBanho';
import DetalheBanho from './pages/DetalheBanho';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    'Lista' : {
      screen: ListaGato,
      navigationOptions: {
        title: "Lista de Gatos"
      }
    },
    'Detalhe' : {
      screen: DetalheGato,
      navigationOptions: {
        title: "Detalhes do Gato"
      }
    },
	'Gerenciar' : {
      screen: GerenciarGato,
      navigationOptions: {
        title: "Gerenciar Gato"
      }
    },
    'AddGato' : {
      screen: CadastroGato,
      navigationOptions: {
        title: "Cadastrar Gato"
      }
    },
	'Vacina' : {
      screen: ListaVacina,
      navigationOptions: {
        title: "Lista de Vacinas"
      }
    },
	'VacinaDetail' : {
      screen: DetalheVacina,
      navigationOptions: {
        title: "Detalhes da Vacina"
      }
    },
	'AddVacina' : {
      screen: CadastroVacina,
      navigationOptions: {
        title: "Adicionar Vacina"
      }
    },
	'AddBanho' : {
      screen: CadastroBanho,
      navigationOptions: {
        title: "Cadastrar Banho"
      }
    },
	'Banho' : {
      screen: ListaBanho,
      navigationOptions: {
        title: "Lista de Banho"
      }
    },
	'BanhoDetail' : {
      screen: DetalheBanho,
      navigationOptions: {
        title: "Detalhes do Banho"
      }
    },
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:"#06f"
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 30,
      }
    }
  }
);

const Router = createAppContainer(AppNavigator); 
export default Router;
