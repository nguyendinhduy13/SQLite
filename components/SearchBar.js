import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

export default function Searchbar({updateSearch, style}) {
  const [query, setQuery] = useState('');
  const [hide, setHide] = useState(false);
  const [value, setValue] = useState('');
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch}>
          <Image
            style={styles.icSearch}
            source={{uri: 'https://img.icons8.com/ios/344/search--v1.png'}}
          />
        </View>

        <TextInput
          value={query}
          placeholder="Search by name"
          style={styles.textInput}
          onChangeText={text => {
            setQuery(text);
            setHide(text.length !== 0 ? true : false);
            updateSearch(text);
          }}
          defaultValue={query}
        />
        {hide ? (
          <TouchableOpacity
            onPress={() => {
              setQuery('');
              updateSearch('');
              setHide(false);
            }}
            style={styles.vwClear}>
            <Image
              style={styles.icClear}
              source={{
                uri: 'https://img.icons8.com/external-prettycons-lineal-prettycons/2x/external-backspace-essentials-prettycons-lineal-prettycons.png',
              }}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.vwClear} />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'white',
  },
  vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icSearch: {
    height: 18,
    width: 18,
  },
  searchContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: 40,
    flexDirection: 'row',
  },
  container: {
    height: 80,
    alignItems: 'center',
  },
  icClear: {
    height: 20,
    width: 20,
  },
});
