import React from 'react';
import classes from './Input.css';
import PropTypes from 'prop-types';

const input = (props) => {
  const inputClasses = [classes.InputElement];
  if (props.validate && props.invalid) {
    inputClasses.push(classes.Invalid);
  }
  
  let inputElement = null;
  switch (props.elementType) {
    case ('select'):
      inputElement = (
       <select 
         className={inputClasses.join(" ")}
         value={props.value}
         onChange={props.changed}
       >
         {props.elementConfig.options.map(option =>
           <option key={option.value} value={option.value}>
             {option.displayValue}
           </option>
         )}
       </select>
      );
      break;
    case ('textarea'):
      inputElement = <textarea 
        className={inputClasses.join(" ")}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
      break;
    case('input'):
    default:
      inputElement = <input 
        className={inputClasses.join(" ")}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
      break;
  }
  
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  label: PropTypes.string,
  value: PropTypes.string
};

export default input;