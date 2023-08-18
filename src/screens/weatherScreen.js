import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import WeatherCard from '../components/weather_card';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

const API_KEY = 'f14a23ef4a1e47e79cb60228231708';
const BASE_URL = 'https://api.weatherapi.com/v1';
const WeatherScreen = () => {
  const [currentWeather, setCurrentWeather] = useState('');
  const [longWeather, setLong] = useState();
  const [showDialog, setDialog] = useState(false);
  let enddate = new Date();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  //getCurrent Weather

  const getWeather = () => {
    axios
      .get(`${BASE_URL}/current.json`, {
        params: {
          Key: API_KEY,
          q: 'Chennai',
        },
      })
      .then(response => {
        setCurrentWeather(response?.data?.current?.condition?.text);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  //get next 14 days Weather

  const getLongWeather = () => {
    axios
      .get(`${BASE_URL}/forecast.json`, {
        params: {
          Key: API_KEY,
          q: 'Chennai',
          days: '14',
        },
      })
      .then(response => {
        setLong(response?.data?.forecast?.forecastday);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  //get history of Weather

  const getWeatherHistory = enddt => {
    const currentFormatedDate = `${year}-0${month}-${day}`;
    console.log('Post Data-->', currentFormatedDate, enddt);
    axios
      .get(`${BASE_URL}/history.json`, {
        params: {
          Key: API_KEY,
          q: 'Chennai',
          dt: enddt,
          end_dt: currentFormatedDate,
        },
      })
      .then(response => {
        setLong(response?.data?.forecast?.forecastday);
      })
      .catch(error => {
        console.error('Error:', error?.response);
      });
  };

  useEffect(() => {
    getWeather();
    getLongWeather();
  }, [currentWeather]);

  return currentWeather && longWeather ? (
    <View style={styles.outerContainer}>
      <View style={styles.row}>
        <Text style={styles.textStyle}>{'Current Weather : '}</Text>
        <Text style={styles.textStyleanswer}>{currentWeather}</Text>
      </View>
      <View style={styles.row}>
        <Text style={{...styles.textStyle, flex: 1}}>{'UpComing Weather'}</Text>
        <TouchableOpacity
          onPress={() => {
            setDialog(true);
          }}>
          <Text style={styles.filtertextStyle}>{'Filter by past dates'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={longWeather}
        renderItem={({item}) => <WeatherCard item={item} />}
        keyExtractor={item => item.date}
      />
      {showDialog && (
        <View>
          <RNDateTimePicker
            value={enddate || new Date()}
            maximumDate={currentDate}
            mode="date"
            onChange={date => {
              setDialog(false);
              enddate = dayjs(date?.nativeEvent?.timestamp).format(
                'YYYY-MM-DD',
              );
              getWeatherHistory(enddate);
            }}
          />
        </View>
      )}
    </View>
  ) : (
    <ActivityIndicator size="large" color={'#AD3982'} />
  );
};
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'start',
  },
  textStyle: {
    color: '#0D0D0D',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 10,
  },
  textStyleanswer: {
    flex: 1,
    color: '#AD3982',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
  },
  filtertextStyle: {
    flex: 1,
    color: '#E87663',
    marginTop: 20,
    fontSize: 16,
    marginEnd: 15,
    textAlign: 'right',
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
export default WeatherScreen;
