import {StyleSheet, Text, View} from 'react-native';

const WeatherCard = item => {
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  let date = item?.item?.date;
  return (
    <View style={styles.row}>
      <View style={{...styles.column, flex: 0.5}}>
        <Text style={styles.textStyle}>{'Date'}</Text>
        <Text style={styles.textStyle}>{formatDate(date)}</Text>
      </View>
      <View style={{...styles.column, flex: 0.5}}>
        <Text style={styles.textStyle}>{'Weather Report'}</Text>
        <Text style={styles.textStyleanswer}>
          {item?.item?.day?.condition?.text}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
    color: '#0D0D0D',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textStyleanswer: {
    flex: 1,
    color: '#AD3982',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    margin: 10,
    marginTop: 20,
    flexDirection: 'row',
  },
  column: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
});
export default WeatherCard;
