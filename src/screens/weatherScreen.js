import {
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
import DatePicker from 'react-native-date-picker';

const API_KEY = 'f14a23ef4a1e47e79cb60228231708';
const BASE_URL = 'https://api.weatherapi.com/v1';
const WeatherScreen = () => {
  const [currentWeather, setCurrentWeather] = useState('');
  const [longWeather, setLong] = useState();
  const [startdate, setstartDate] = useState(new Date());
  const [enddate, setendDate] = useState(new Date());
  const [showDialog, setDialog] = useState(false);

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

  useEffect(() => {
    getWeather();
    getLongWeather();
  }, [currentWeather]);

  const hideDatePicker = () => {
    setDialog(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  return (
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
          <Text style={styles.filtertextStyle}>{'Filter by date'}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <DatePicker
          modal
          open={showDialog}
          date={startdate}
          androidVariant="nativeAndroid"
          onConfirm={date => {
            setDialog(false);
            setstartDate(date);
          }}
          onCancel={() => {
            setDialog(false);
          }}
        />
      </View>
      <FlatList
        data={longWeather}
        renderItem={({item}) => <WeatherCard item={item} />}
        keyExtractor={item => item.date}
      />
    </View>
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
