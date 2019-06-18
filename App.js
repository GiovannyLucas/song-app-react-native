import React, { Component } from 'react';
import { Text, Image, Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Fundo } from "./src/style";

import Detalhes from './src/screens/Detalhes';
import Buscar from './src/screens/Buscar';
import PlayLists from './src/screens/PlayLists';

import { createAppContainer, navigateAction, createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

class App extends Component {
    state = {
        data_albuns: [],
        data_artistas: []
    }

componentWillMount(){
    axios.get('https://api.deezer.com/search?q=album:"a"')
    .then(res => {
        this.setState({ data_albuns: res.data.data })
    })
    .catch((err) => {
        alert(err);
    })

    axios.get('https://api.deezer.com/search?q=artist:"a"')
    .then(res => {
        this.setState({ data_artistas: res.data.data })
    })
    .catch((err) => {
        alert(err);
    })
}


    render() { 
        return ( 
            <Fundo>
                <View style={styles.logo}>
                    <Image style={{width: 300, height: 60}} source={require("./src/img/logo.png")} />
                </View>

               
                <Text style={styles.titulo}>Álbuns</Text>

                <FlatList
                    data={this.state.data_albuns}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    renderItem={({item}) =>
                    
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <Image source={{uri: item.artist.picture_big}} style={{width: 110, height: 100, margin: 10}} />
                            <Text style={{color: "#fff"}}>{item.title_short}</Text>
                        </View>
                    
                    }
                    keyExtractor={item => item.id}
                />

                <Text style={styles.titulo}>Artistas</Text>

                <FlatList
                    data={this.state.data_artistas}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    renderItem={({item}) =>
                    
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <Image source={{uri: item.artist.picture_big}} style={{width: 110, height: 100, margin: 10}} />
                        <TouchableOpacity onPress={() => {
                            navigator.navigate('Detalhes', { albumid: item.id })
                        }}>
                            <Text style={{color: "#fff"}}>{item.title}</Text>
                        </TouchableOpacity>
                        
                        
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
    logo: {
        width: '100%',
        height: 70,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        color: '#fff',
        fontSize: 18
    }
});


export default createAppContainer(createBottomTabNavigator({
    Home: { 
        screen: App,
        navigationOptions: {
            tabBarIcon: 
                <Icon name="home" size={25} color="#555" />,
             
        }
    },
    Buscar: { 
        screen: Buscar,
        navigationOptions: {
            tabBarIcon: 
                <Icon name="search" size={25} color="#555" />
        }
    }, 
    PlayLists: { 
        screen: PlayLists,
        navigationOptions: {
            tabBarIcon: 
                <Icon name="play" size={25} color="#555" />
        }
    }, 
    Detalhes: { 
        screen: Detalhes,
        navigationOptions: {
            tabBarIcon: 
                <Icon name="info" size={25} color="#555" />
        }
    }
})
);