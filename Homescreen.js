import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Touchable, TouchableOpacity } from 'react-native';
import dictionary from "../database";

export default class Homescreen extends React.Component{
    constructor(){
        super()
        this.state={
            text : "",
            isSearchPressed : "",
            word : "",
            lexicalCategory : "",
            examples : [],
            definition: "",
            
        }
    }
    render(){
        return (
            <View>
                <TextInput                  
                 style={StyleSheet.inputBox}
                    onChangeText={text => {
                        this.setState{{
                            text: text,
                            isSearchPressed : false,
                            word : "Loading...",
                            lexicalCategory : '',
                            examples : [],
                            definition : ""
                        }}
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={StyleSheet.searchButton}
                    onPress={() => {
                        this.setState{{ isSearchPressed: true }}
                        this.getWord(this.state.text)
                    }}>
                </TouchableOpacity>
                <View style={styles.detailsContaniner}>
                    <Text style={styles.detailsTitle}>
                        Word :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.word}
                    </Text>
                </View>
                <View style={styles.detailsContaniner}>
                    <Text style={styles.detailsTitle}>
                        Type :{" "}
                    
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                        Defintion :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.definition}
                    </Text>                    
                </View>               
            </View>
        )
    }
}

getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
        if(data.status===200)
        {
            return data.json()
        }
        else
        {
            return null
        }
    update(url)
    .then((response)=>{
        var responseObject = response 
        if(responseObject)
        {
            var wordData = responseObject.definition[0]
            var definition=wordData.description
            var lexicalCategory=wordData.wordtype

            this.setState({
                "word" : this.state.text,
                "definition" :definition,
                "lexicalCategory": lexicalCategory
            })
        }
        else
        {
            this.setState({
                "word": this.state.text,
                "definition" :"Not Foun",
            })
        }
    })
    })
}

getWord=(text)=>{
    var text = text.toLowerCase()
    try{
        var word = dictionary[text]["word"]
        var lexicalCategory = dictionary[text]["lexicalCategory"]
        var definition = dictionary[text]["definaton"]
        this.setState({
            "word" : word,
            "lexicalCategory" : lexicalCategory,
            "definition" : definition
        })
    }
    catch(err){
        alert("Sorry This word is not avilable for now")
        this.setState({
            'text':'',
            'isSearchPressed': false
        })
    }
}

const styles = StyleSheet.create({
    searchButton: {

    },
    detailsContaniner: {

    },
    detailsTitle: {

    }
})