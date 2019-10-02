import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import SearchBar from '../screens/SearchBar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

//TODO: 
// 1. Layout on FlatList must fit
// 2. Continous loading of data - for future development
// 3. check for network connectivity
// 4. CRUD for Stockist

export default function StockistScreen() {

  var URL = "https://parseapi.back4app.com/classes/Stockist"
  var config = {
    headers: {
      'X-Parse-Application-Id': 'sc1bR014VdHASvjglsRlV7ToUSJksGjrSj7aOOVn',
      'X-Parse-REST-API-Key': 'BD9chy6NpN1VVjixzO9LyPOr7IrDOmg4G8BCKBAl'
    },
    params: {
      'where': '{ "province": { "$regex": "^CAVITE" } }',
      'order': 'name'
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState('');

  const callPhone = (phone) => {
    Linking.openURL('tel:' + phone.split('/')[0].trim());
  }


  const smsPhone = (phone) => {
    Linking.openURL('sms:' + phone.split('/')[0].trim());
  }

  const searchApi = async (searchTerm) => {
    setIsLoading(true);
    try {
      const result = await axios.get(URL,
        {
          headers: {
            'X-Parse-Application-Id': 'sc1bR014VdHASvjglsRlV7ToUSJksGjrSj7aOOVn',
            'X-Parse-REST-API-Key': 'BD9chy6NpN1VVjixzO9LyPOr7IrDOmg4G8BCKBAl'
          },
          params: {
            'where': `{ "$or" : [ { "municipality": { "$regex": ".*${searchTerm.toUpperCase()}" } }, { "province": { "$regex": ".*${searchTerm.toUpperCase()}" } }, { "barangay": { "$regex": ".*${searchTerm.toUpperCase()}" } }, { "name": { "$regex": ".*${searchTerm.toUpperCase()}" } } ] }`,
            'order': 'municipality'
          }
        }
      );
      setData(result.data);
      setIsLoading(false);
    } catch (err) {
      setData('Something went wrong');
    }
  }

  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);

  useEffect(() => {
    if (isMountRef.current) {
      searchApi(term);
    }
    else {
      isMountRef.current = true;
    }
  }, [])

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />

      {(isLoading) ? (
        <View style={styles.stylOld}>
          <ActivityIndicator
            color="#ffe536"
            size="large"
            style={styles.ActivityIndicatorStyle}
          />
        </View>)
        :
        (
          <FlatList style={{ marginBottom: 80 }}
            data={data.results}
            keyExtractor={item => item.objectId}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name.trim()}</Text>
                {item.barangay ? <Text>{item.barangay.trim()}</Text> : null}
                {item.municipality ? <Text>{item.municipality.trim()}, {item.province.trim()}</Text> : <Text>{item.province.trim()}</Text>}
                {item.authorized_person ? <Text>Authorized Person: {item.authorized_person.trim()}</Text> : null}
                {item.contact ? <Text >Contact: {item.contact.trim()}</Text> : null}
                {item.contact ? (<View style={styles.phoneContainer}>
                  <View style={styles.smsPhoneContainer}>
                    <TouchableOpacity onPress={() => callPhone(item.contact.trim())}>
                      <MaterialCommunityIcons
                        name={"phone"}
                        size={25}
                        style={{ marginBottom: -3 }}
                        color={'green'}
                      />
                    </TouchableOpacity >
                  </View>
                  <View style={styles.smsPhoneContainer}>
                    <TouchableOpacity onPress={() => smsPhone(item.contact.trim())}>
                      <MaterialCommunityIcons
                        name={"message-text"}
                        size={25}
                        style={{ marginBottom: -3 }}
                        color={'blue'}
                      />
                    </TouchableOpacity >
                  </View>
                </View>) : null}
              </View>
            )
            }
          />
        )
      }
    </View >
  )
}



StockistScreen.navigationOptions = {
  title: 'Stockist and BCO',
  headerStyle: {
    backgroundColor: "#ffe536"
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#F0EEEE',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    flex: 1,
  },
  title: {
    fontSize: 32,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  stylOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  smsPhoneContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});