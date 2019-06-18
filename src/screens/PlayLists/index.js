import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Fundo } from "../../style";

export default class PlayLists extends Component {
    state = {

    }
    
    render() { 
        return ( 
        <Fundo>    
            <Text>PlayLists</Text> 
        </Fundo>
        );
    }


    static navigationOptions = ({ navigation }) => ({
        tabBarOptions: {
            showLabel: true,
            style: {
                backgroundColor: "#000",
                height: 60
            }
        }
    })
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
});