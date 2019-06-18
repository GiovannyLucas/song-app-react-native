import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { Fundo } from "../../style";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";



export default class Buscar extends Component {
    state = {
        musica: '',
        data_musicas: [],
        mp3: '',
        playState: 'paused',
        duration: 0
    }

buscarMusica = () => {
    axios.get(`https://api.deezer.com/search?q=track:"${this.state.musica}"`)
    .then(res => {
        this.setState({ data_musicas: res.data.data })
    })
    .catch((err) => {
        alert(err);
    })
}


    render() { 
        return ( 
        <Fundo>
            <View style={{alignItems: 'center', marginTop: 20, flex:1}}>    
                <TextInput 
                    style={{width: '80%', height: 40, backgroundColor: '#ddd'}}
                    keyboardType="text"
                    placeholder="Música..."
                    onChangeText={(musica) => this.setState({musica: musica})}
                />
                <TouchableOpacity onPress={this.buscarMusica} style={{marginTop: 10}}>
                    <Icon name="search" size={25} color="#ddd" />
                </TouchableOpacity>
            <FlatList
                    data={this.state.data_musicas}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center", width: '95%', borderWidth: 21}}>
                            <Text style={{color: "#fff"}}>{item.title_short}</Text>
                            <Text style={{color: "#fff"}}>Duração: {item.duration} seg</Text>
                            <Text style={{color: "#fff"}}>Ranking: {item.rank}</Text>
                            <Text style={{color: "#fff"}}>{item.artist.name}</Text>

                            <TouchableOpacity>
                                <Icon name="play" size={25} color="#555" />
                            </TouchableOpacity>
                        </View>
                    
                    }
                    keyExtractor={item => item.id}
                />   
                    
                
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
    }
});
