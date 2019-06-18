import React, { Component } from 'react';
import { Text } from 'react-native';
import { Fundo } from "../../style";

class ViewAlbum extends Component {
    
    state = {

    }

    render() { 
        return (
            <Fundo> 
                <Text>Albumteste</Text>
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
 
export default ViewAlbum;