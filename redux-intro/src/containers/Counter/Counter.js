import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  render () {
    return (
      <div>
        <CounterOutput value={this.props.ctr} total={this.props.total}/>
        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
        <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
        <CounterControl label="Add 5" clicked={() => this.props.onAddValueCounter(5)}  />
        <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractValueCounter(5)}  />
        <CounterControl label="Reset" clicked={this.props.onResetCounter}  />
        <CounterControl label="404" clicked={this.props.onTGCounter}  />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.counter,
    total: state.total
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
    onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
    onAddValueCounter: (value) => dispatch({type: 'ADD_VALUE', value: value}),
    onSubtractValueCounter: (value) => dispatch({type: 'SUBTRACT_VALUE', value: value}),
    onResetCounter: () => dispatch({type: 'RESET'}),
    onTGCounter: () => dispatch({type: '404'})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);