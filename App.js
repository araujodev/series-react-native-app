import { createStackNavigator } from 'react-navigation';
import LoginPage from './src/pages/LoginPage';

export default createStackNavigator({
    
    'Login': {
        screen: LoginPage,
        navigationOptions: {
            title: "Anotherflix"
        }
    }

}, {
    navigationOptions: {
        title: "Series",
        headerStyle: {
            backgroundColor: '#630503',
            borderBottomWidth: 1,
            borderBottomColor: "#23050A",
        },
        headerTintColor: "white",
        headerTitleStyle: {
            color: "white",
            fontSize: 25,
            textShadowColor: "#23050A",
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10
        }
        
    }
});