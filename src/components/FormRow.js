import React from 'react';
import {View, StyleSheet} from 'react-native';

const FormRow = (props) => {
    const { children } = props;
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: "#340804",
        borderBottomWidth: 3,
        borderBottomColor: "#000"
    }
});

export default FormRow; 