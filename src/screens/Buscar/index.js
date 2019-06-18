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
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{alignItems: 'center', justifyContent:'center', backgroundColor: '#ddd', width: '82%', height:40, marginTop: 20, flexDirection:'row' }}>    
                    <TextInput 
                        style={{width: '80%', height: 40, backgroundColor: '#ddd'}}
                        keyboardType="text"
                        placeholder="Música..."
                        onChangeText={(musica) => this.setState({musica: musica})}
                    />
                    <TouchableOpacity onPress={this.buscarMusica} style={{marginTop: 0}}>
                        <Icon name="search" size={25} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>    

            <FlatList
                    style={{marginTop: 5}}
                    data={this.state.data_musicas}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    
                    <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center", width: '100%', borderWidth: 1}}>
                        <View style={{paddingVertical:10, paddingHorizontal: 25}}>
                            <Text style={{color: "#fff"}}>
                                <Icon name="play" size={25} color="#555" />{item.title_short}
                            </Text>
                            <Text style={{color: "#fff"}}>Duração: {item.duration} seg</Text>
                            <Text style={{color: "#fff"}}>Ranking: {item.rank}</Text>
                            <Text style={{color: "#fff"}}>{item.artist.name}</Text>
                        </View>
                    </View>
                    }
                    keyExtractor={item => item.id}
                />  
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
