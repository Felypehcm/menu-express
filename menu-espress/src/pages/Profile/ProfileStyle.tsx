import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA07A',
    alignItems: 'center'
  },
  container2: {
    padding: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 165,
    marginBottom: 10,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageText: {
    fontSize: 16,
    color: 'white',
  },
  textView: {
    marginTop: 180,
    alignSelf: 'flex-start',
    width: 350
  },
  text: {
    marginTop: 30,
    fontSize: 20,
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 8, 
    borderColor: '#fb4e30',
    padding: 8
  },
  buttonContainer: {
    marginTop: 200,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#fb4e30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
});

export default styles;
