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
    },
    totalPriceBottomContainer: {
        bottom: 0,
        left: 0,
        right: 0,
    },
    totalPriceBottom: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#fff'
    },
  });

  export default styles;