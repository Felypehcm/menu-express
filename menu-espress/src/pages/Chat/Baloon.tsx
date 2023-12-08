import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const styles = StyleSheet.create({
    bubbleWrapper: {
        flexDirection: 'column',
    },
    bubbleWrapperSent: {
        alignSelf: 'flex-end',
        marginLeft: 40,
    },
    bubbleWrapperReceived: {
        alignSelf: 'flex-start',
        marginRight: 40,
    },
    balloon: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 16,
    },
    balloonSent: {
        backgroundColor: Colors.primary,
    },
    balloonReceived: {
        backgroundColor: Colors.white,
    },
    balloonText: {
        fontSize: 18,
    },
    balloonTextSent: {
        color: Colors.white
    },
    balloonTextReceived: {
        color: Colors.black
    },
})

const Balloon = ({ message, currentUser }: any) => {
    const sentByCurrentUser = currentUser === message.sender;
    const balloonColor = sentByCurrentUser ? styles.balloonSent : styles.balloonReceived;
    const balloonTextColor = sentByCurrentUser
      ? styles.balloonTextSent
      : styles.balloonTextReceived;
    const bubbleWrapper = sentByCurrentUser
      ? styles.bubbleWrapperSent
      : styles.bubbleWrapperReceived;
    
    if (message) {
      console.log("Rendering message:", message);
      return (
        <View style={{ marginBottom: '2%' }}>
          <View style={{ ...styles.bubbleWrapper, ...bubbleWrapper }}>
            <View style={{ ...styles.balloon, ...balloonColor }}>
              <Text>
                {message.sender}
              </Text>
              <Text style={{ ...styles.balloonText, ...balloonTextColor }}>
                {message.text}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      console.log("No message to render.");
      return <></>;
    }
  };
  
  export default Balloon;