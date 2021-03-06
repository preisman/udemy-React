import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler';
import Aux from '../../hoc/Aux';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRICE = 4;

class BurgerBuilder extends Component {
  //construtor(props) {
  //  super(props);
  //  this.state = {...}
  //}
  
  state = {
    showPurchaseModal: false,
    error: false
  }
  
  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        console.log(response);
        this.props.initializeIngredientInfo(response.data);
      })
      .catch(error => {
        console.log(error);
        this.setState({error: error});
      });
  }
  
  purchaseModalHandler = (showModal) => {
    this.setState({showPurchaseModal: showModal});
  }
  
  purchaseContinueHandler = () => {
    // alert(`You paid $${this.props.totalPrice.toFixed(2)}!`);
    this.props.history.push("/checkout");
  }
  
  purchaseCancelHandler = () => {
    this.purchaseModalHandler(false);
  }
  
  render () {
    const disabledInfo = {
      ...this.props.ingredients
    };
    
    let orderSummary = null;
    let burger = (!!this.state.error) ? 
      <p>Cannot load Ingredients! {this.state.error.toString()}</p> :
      <Spinner/>;
      
    if (this.props.ingredients) {
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
      
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded = {(type) => this.props.addIngredient(type)}
            ingredientRemoved = {(type) => this.props.removeIngredient(type)}
            disabledInfo = {disabledInfo}
            canOrder = {this.props.totalIngredients > 0}
            purchaseModalHandler = {() => this.purchaseModalHandler(true)}
            totalPrice={this.props.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          continueHandler={this.purchaseContinueHandler}
          cancelHandler={this.purchaseCancelHandler}
        />
      );
    }
    
    return (
      <Aux>
        <Modal 
          show={this.state.showPurchaseModal}
          hideModalHandler={() => this.purchaseModalHandler(false)}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalIngredients: state.totalIngredients,
    totalPrice: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    initializeIngredientInfo: (ingredientInfo) => dispatch({
      type: actionTypes.INITIALIZE_INGREDIENT_INFO,
      ingredientInfo: ingredientInfo
    }),
    addIngredient: (ingredientName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingredientName
    }),
    removeIngredient: (ingredientName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingredientName
    }),
  };
}

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios
);