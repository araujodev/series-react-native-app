import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import FormRow from '../components/FormRow'; 

export default class CreateAccountPage extends React.Component{

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
        firebase.app();
    }


    onChangeHandler(field, val) {
        this.setState({
            [field]: val
        });
    }

    createAccount() {
        this.setState({ isLoading: true, message: '' });
        const { email, password } = this.state;

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then( user => {
                this.setState({ message: "Usuário criado com sucesso." }); 
            }) 
            .catch( error => {
                this.setState({ message: this.getMessageByErrorCode(error.code) });
            })
            .then( () => this.setState({ isLoading: false }) );
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return "Este email já está sendo usado.";
            case 'auth/invalid-email':
                return "Endereço de email inválido.";
            case 'auth/operation-not-allowed':
                return "Operaçao nao permitida.";
            case 'auth/weak-password':
                return "Senha fraca, tente novamente com outra mais forte.";
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
                onPress={ () => this.createAccount() }
                title="Cadastrar" />

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
                <Text style={styles.initialText}> Criar Nova Conta </Text>
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