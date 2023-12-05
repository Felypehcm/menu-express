import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container2: {
    padding: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA07A'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginTop: 40,
    alignSelf: 'flex-start',
    borderRadius: 2,
    borderColor: '#000000'
  },
  text: {
    marginTop: 30,
    fontSize: 18,
    marginLeft: 5
  },
  buttonContainer: {
    marginTop: 100,
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
    fontSize: 16,
  },
});

export default styles;
