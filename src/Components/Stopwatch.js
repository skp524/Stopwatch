import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateState} from '../actions/Action';
import {View, Button, Text, ScrollView, StyleSheet} from 'react-native';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerStarted: false,
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
    };
  }

  startTimer = () => {
    const {timeBegan, stoppedDuration} = this.state;
    const currentTime = new Date();
    const timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);
    const hour = timeElapsed.getUTCHours();
    const min = timeElapsed.getUTCMinutes();
    const sec = timeElapsed.getUTCSeconds();
    const ms = timeElapsed.getUTCMilliseconds();
    const hours = hour > 9 ? `${hour}:` : hour === 0 ? '' : `0${hour}:`;
    const mins = min > 9 ? min : `0${min}`;
    const secs = sec > 9 ? sec : `0${sec}`;
    const mss = ms > 99 ? ms : ms > 9 ? `0${ms}` : `00${ms}`;
    const timer = `${hours}${mins}:${secs}.${mss}`;
    this.props.updateState({key: 'timer', value: timer});
  };
  handleStart = () => {
    const {timeBegan, timeStopped} = this.state;
    this.setState({isTimerStarted: true});
    if (timeBegan === null) {
      this.setState({timeBegan: new Date()});
    }
    if (timeStopped !== null) {
      this.setState({stoppedDuration: new Date() - timeStopped});
    }
    this.setState({started: setInterval(this.startTimer, 10)});
  };
  handleStop = () => {
    const {started} = this.state;
    this.setState({isTimerStarted: false, timeStopped: new Date()});
    clearInterval(started);
  };
  handleLap = () => {
    const {updateState, laps, timer} = this.props;
    updateState({key: 'laps', value: [...laps, timer]});
  };
  handleReset = () => {
    const {started} = this.state;
    clearInterval(started);
    this.setState({stoppedDuration: 0, timeBegan: null, timeStopped: null});
    this.props.updateState({key: 'timer', value: '00:00.000'});
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.timerText}> {this.props.timer} </Text>
        <ScrollView style={styles.scrollViewStyle}>
          {this.props.laps.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title={this.state.isTimerStarted ? 'Stop' : 'Start'}
            onPress={
              this.state.isTimerStarted ? this.handleStop : this.handleStart
            }
          />
          <Button
            title="Lap"
            disabled={!this.state.isTimerStarted}
            onPress={this.handleLap}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    timer: state.reducer.timer,
    laps: state.reducer.laps,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateState: updateState,
    },
    dispatch,
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between', paddingVertical: 20},
  timerText: {fontSize: 28, fontWeight: 'bold', alignSelf: 'center'},
  scrollViewStyle: {fontSize: 14, marginVertical: 10, alignSelf: 'center'},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
});
export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
