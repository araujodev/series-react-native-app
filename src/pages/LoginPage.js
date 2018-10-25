import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component{

    render(){
        return (
            <View style={styles.container}>
                <FormRow>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="email@example.com"
                        placeholderTextColor="#bbb" />
                </FormRow>
                <FormRow>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="* * * * * * *"
                        placeholderTextColor="#bbb"
                        secureTextEntry />
                </FormRow>

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
    }
});