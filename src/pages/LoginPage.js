import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import FormRow from '../components/FormRow'; 

export default class LoginPage extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            message: ''   
        }
    }

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyBkYcD9-oorn8LTnb5-oSjnLTlJsPiACNU",
            authDomain: "series-65834.firebaseapp.com",
            databaseURL: "https://series-65834.firebaseio.com",
            projectId: "series-65834",
            storageBucket: "series-65834.appspot.com",
            messagingSenderId: "259934473599"
        };
        firebase.initializeApp(config);
    }


    onChangeHandler(field, val) {
        this.setState({
            [field]: val
        });
    }

    tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { email, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then( user => {
                this.setState({ message: "Usuário autenticado com sucesso." }); 
            }) 
            .catch( error => {
                this.setState({ message: this.getMessageByErrorCode(error.code) });
            })
            .then( () => this.setState({ isLoading: false }) );
    }

    createAccount() {
        this.props.navigation.navigate('CreateAccount');
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return "Senha Incorreta.";
            case 'auth/user-not-found':
                return "Usuário nao encontrado.";
            default:
                return "Erro desconhecido";
        }
    }

    renderButton() {
        if(this.state.isLoading)
            return <ActivityIndicator />

        return (

            <Button 
                color="#C01E00"
                onPress={ () => this.tryLogin() }
                title="Acessar Conta" />

        );
    }

    renderMessage() {
        const {message} = this.state;
        if(!message)
            return null;

        return (
            <View style={styles.messageView}>
                <Text style={styles.messageText}> { message } </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.initialText}> Entre com sua conta </Text>
                <FormRow>
                    <TextInput
                        onChangeText={ (value) => this.onChangeHandler('email', value) }
                        value={this.state.email} 
                        style={styles.textInput} 
                        placeholder="email@example.com"
                        placeholderTextColor="#bbb" />
                </FormRow>
                <FormRow>
                    <TextInput 
                        onChangeText={ (value) => this.onChangeHandler('password', value) }
                        value={this.state.password}
                        style={styles.textInput} 
                        placeholder="* * * * * * *"
                        placeholderTextColor="#bbb"
                        secureTextEntry />
                </FormRow>
                { this.renderButton() }
                <Text style={styles.orText}> Ou </Text>
                <Button 
                    color="#C01E00"
                    onPress={ () => this.createAccount() }
                    title="Criar Nova Conta" />

                { this.renderMessage() }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    'container': {
        flex: 1,
        height: null,
        backgroundColor: "#150708",
        padding: 10
    },
    'textInput': {
        color: '#f7f7f7',
        fontSize: 16,
        paddingLeft: 5,
        paddingRight: 5,
    },
    initialText: {
        color: 'white',
        marginTop: 25,
        marginBottom: 15,
        alignSelf: 'center'
    },
    messageView: {
        backgroundColor: '#ccc',
        padding: 15
    },
    messageText: {
        color: '#333',
        alignSelf: 'center'
    },
    orText: {
        color: 'white',
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center'
    }
});