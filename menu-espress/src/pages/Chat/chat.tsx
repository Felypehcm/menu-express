import React, { useEffect } from 'react'
import {Fragment} from 'react'
import {ScrollView, SafeAreaView, Text, TextInput, View, TouchableOpacity} from 'react-native'
import { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Balloon from './Baloon'
import styles from './ChatStyle'
import storageService from '../../storageService'

const Chat = () => {

    const [text, setText] = useState('');
    const [chat, setChat] = useState<{ messages: { text: string; sender: string }[] }>({ messages: [] });
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
      storageService.get('userData').then((userDataString) => {
        if (userDataString) {
          const userDataObject = JSON.parse(userDataString);
          setUserData(userDataObject);
        }
      });
    }, []);
    
    const sendMessage = () => {
      if (text.trim() === '') {
        return;
      }
    
      const senderName = userData.name || 'Nome Padrão';
    
      const newMessage = {
        text,
        sender: senderName,
      };
    
      setChat((prevChat) => {
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
      });
    
      setText('');
    };

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