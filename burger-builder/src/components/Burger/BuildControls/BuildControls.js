import React from 'react';
import classes from './BuildControls.css';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';

const CONTROLS = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
    {CONTROLS.map(ctrl => (
      <BuildControl 
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabledInfo[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      onClick={props.purchaseModalHandler}
      disabled={!props.canOrder}
    >
      ORDER NOW
    </button>
  </div>
);

buildControls.propTypes = {
  canOrder: PropTypes.bool,
  disabledInfo: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired,
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  purchaseModalHandler: PropTypes.func.isRequired
};

export default buildControls;