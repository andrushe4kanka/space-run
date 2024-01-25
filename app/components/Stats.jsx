import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

const Stats = props => {
    const { scoreCount, gameSpeed } = props;
    return (
        <View style={styles.stats}>
          <Text style={styles.text}>Очко: {scoreCount}</Text>
          <Text style={styles.text}>Скорость: {(gameSpeed * 10).toFixed(0)}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
      fontSize: 16,
      color: '#FF5A21',
    },
    stats: {
      position: 'absolute',
      top: 10,
      left: 0,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: width
    },
  });
  
  export default Stats;