import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Fundo } from "../../style";

import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Detalhes extends Component {
    state = {
        tipo: this.props.navigation.getParam('tipo'),
        id: this.props.navigation.getParam('id'),
        dados_album: [],
        dados_artist: []
    }
    
    componentWillUpdate(){
        if(this.props.navigation.getParam('tipo') == 'album'){
            axios.get(`https://api.deezer.com/${this.props.navigation.getParam('tipo')}/${this.props.navigation.getParam('id')}`)
            .then((res) => {
                this.setState({ dados_album: res.data });
            })
            .catch((err) => {
                alert(err);
            })
        } else {
            axios.get(`https://api.deezer.com/${this.props.navigation.getParam('tipo')}/${this.props.navigation.getParam('id')}`)
            .then((res) => {
                this.setState({ dados_artist: res.data });
            })
            .catch((err) => {
                alert(err);
            })
        }
    }

    componentDidMount(){
        if(this.props.navigation.getParam('tipo') == 'album'){
            axios.get(`https://api.deezer.com/${this.props.navigation.getParam('tipo')}/${this.props.navigation.getParam('id')}`)
            .then((res) => {
                this.setState({ dados_album: res.data });
            })
            .catch((err) => {
                alert(err);
            })
        } else {
            axios.get(`https://api.deezer.com/${this.props.navigation.getParam('tipo')}/${this.props.navigation.getParam('id')}`)
            .then((res) => {
                this.setState({ dados_artist: res.data });
            })
            .catch((err) => {
                alert(err);
            })
        }
    }


    render() { 
        return ( 
        <Fundo>    
            <View style={{ justifyContent:'center', alignItems: 'center', marginTop: 10 }}>
                <Image style={styles.image} source={{uri: this.props.navigation.getParam('tipo') == 'album' ? this.state.dados_album.cover_xl : this.state.dados_artist.picture_xl }}/>
                <Text style={{color: 'white', fontSize: 25, marginTop: 5 }}>
                    {this.props.navigation.getParam('tipo') == 'album' ? this.state.dados_album.title : this.state.dados_artist.name}
                </Text>
            </View>
            <View style={{ justifyContent:'center', alignItems:'center', marginTop: 20 }}>
                <View style={{ borderWidth:2, borderColor: '#888', width:'80%' }}>
                    <Text style={{color: 'white', fontSize:20}}>
                        Fãs: {this.props.navigation.getParam('tipo') == 'album' ? this.state.dados_album.fans : this.state.dados_artist.nb_fan} 
                        <Icon name="star" size={25} color="#888" />    
                    </Text>
                    <Text style={{color: 'white', fontSize:20}}>
                        Id: {this.props.navigation.getParam('tipo') == 'album' ? this.state.dados_album.id : this.state.dados_artist.id} 
                        <Icon name="thumbs-up" size={25} color="#888" />  
                    </Text>
                </View>
            </View>
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
    },
    image: {
        width: '90%',
        height: 200
    }
});