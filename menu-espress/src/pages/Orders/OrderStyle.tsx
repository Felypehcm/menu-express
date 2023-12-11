import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    heading: {
      fontSize: 24,
      textAlign: 'center',
      marginVertical: 10,
      fontWeight: 'bold',
    },
    orderCard: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginVertical: 10,
      padding: 10,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    productInfo: {
      marginBottom: 10,
    },
    totalPrice: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#fb4e30',
      color: 'white'
    }
  });

  export default styles;