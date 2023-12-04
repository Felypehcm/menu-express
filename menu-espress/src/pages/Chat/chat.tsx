import React from 'react'
import {Fragment} from 'react'
import {ScrollView, SafeAreaView, Text, TextInput, View, TouchableOpacity} from 'react-native'
import { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Balloon from './Baloon'
import styles from './ChatStyle'
import storageService from '../../storageService'

/*
    sentBy: 'Tiago Souto'
    date: '01/12/2023 11:14:20'
    text: 'Hello World'
*/

const Chat = () => {
    const sendMessage = () => {}
    const options: any = {messages: []}
    const [text, setText] = useState('')
    const [chat, setChat] = useState(options)
    const [userData, setUserData] = useState(options) 
    storageService.get('userData').then((userData) => setUserData(userData))

    return (
        <Fragment>
            <ScrollView>
                {
                chat.messages.length > 0 ?
                    chat.messages.map((m:any, index:number) => (
                        <Balloon key={index} message={m} currentUser={userData.name} />
                    )):
                    <Text style={{marginTop: '5%', alignSelf: 'center', color: '#848484'}}>
                        Sem mensagens no momento
                    </Text>
                }
            </ScrollView>

            <SafeAreaView>
                <View style={styles.messageTextInputContainer}>
                    <TextInput
                        style={styles.messageTextInput}
                        placeholder="Digite sua mensagem..."
                        placeholderTextColor={Colors.light}
                        value={text}
                        multiline
                        onChangeText={(message) => setText(message)}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        disabled={!text}
                        onPress={() => sendMessage()}>
                        <Text style={{color: Colors.white}}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Fragment>
    )
}

export default Chat