import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
let SQLite = require('react-native-sqlite-storage');

const db = openDatabase('test1.db');
export default function AddScreen({navigation}) {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [list, setList] = React.useState([]);
  const image = {
    uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/dc3b2546601081.585ad762e70eb.jpg',
  };

  useEffect(() => {
    findName();
  }, []);

  const HandleSave = async () => {
    // delDB();
    if (!name) {
      alert('Please fill name');
      return;
    }
    await findName();
    if (list.length > 0) {
      console.log(1111);
      for (let i = 0; i < list.length; i++) {
        if (name === list[i].name) {
          alert('Name is valid');
          return;
        }
      }
    }
    if (!age) {
      alert('Please fill age');
      return;
    }
    if (isNaN(age)) {
      alert('Age must be a number');
      return;
    }
    alert('sucess');
    insert(name, age);
    await findName();
  };
  const delDB = () => {
    var query = 'delete from Users';
    var params = [];
    db.transaction(txn => {
      txn.executeSql(
        query,
        params,
        (txn, results) => {},
        function (txn, err) {
          alert('Warning');
          console.log(1);
          return;
        },
      );
    });
  };
  const insert = (_name, _age) => {
    var query = 'INSERT INTO Users (id,name,age) VALUES (null,?,?)';
    var params = [_name, _age];
    db.transaction(txn => {
      txn.executeSql(
        query,
        params,
        (txn, results) => {
          console.log(results);
        },
        function (txn, err) {
          alert('Warning');
          console.log(1);
          return;
        },
      );
    });
  };
  const findName = async () => {
    var query = 'SELECT name from Users';
    var params = [];
    db.transaction(txn => {
      txn.executeSql(
        query,
        params,
        (txn, results) => {
          if (results.rows.length > 0) {
            let array = [];
            for (let i = 0; i < results.rows.length; i++) {
              console.log(results.rows.item(i));
              let item = results.rows.item(i);
              array.push({name: item.name});
              console.log(array);
            }
            setList(array);
          }
        },
        function (txn, err) {
          alert('Warning');
          console.log(1);
          return;
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>ADD INFORMATION</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          onChangeText={text => setName(text)}
          defaultValue={name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Age"
          onChangeText={text => setAge(text)}
          defaultValue={age}
        />
        <TouchableOpacity onPress={HandleSave} style={[styles.button,{marginLeft:48}]}>
          <Text style={styles.buttontext}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('Home')}
          style={[styles.button, {marginTop:-40,marginLeft:200}]}>
          <Text style={styles.buttontext}>BACK</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    margin: 20,
    height: 48,
    borderRadius: 150,
    backgroundColor: 'white',
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: '#C6E2FF',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttontext: {
    color: '#000000',
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: '700',
    
  },
});
