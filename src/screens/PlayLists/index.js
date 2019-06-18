import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, Image } from 'react-native';
import { Fundo } from "../../style";

import axios from "axios";

export default class PlayLists extends Component {
    state = {
        data_playlist: []
    }
    
componentWillMount(){
    axios.get('https://api.deezer.com/search?q=playlist:"a"')
    .then(res => {
        this.setState({ data_playlist: res.data.data })
    })
    .catch((err) => {
        alert(err);
    })
}
    
    render() { 
        return ( 
        <Fundo>    
            <FlatList
                data={this.state.data_playlist}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                    <View style={{flexDirection:'row', flexWrap: 'wrap', width: '100%', alignItems: "center"}}>
                        <View>
                            <Image source={{uri: item.artist.picture_big}} style={{width: 110, height: 100, margin: 10}} />
                        </View>
                        <View>
                            <Text style={{color: "#fff"}}>{item.title_short}</Text>
                            <Text style={{color: "#fff"}}>{item.rank}</Text>
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