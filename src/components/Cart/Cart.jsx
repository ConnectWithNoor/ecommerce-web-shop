import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

function Cart({
  cart,
  handleEmptyCart,
  handleRemoveFromCart,
  handleUpdateCartQuantity,
}) {
  //   const isEmpty = true;
  const classes = useStyles();

  if (!cart.line_items) return 'Loading...!';

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart?.line_items?.length ? (
        <EmptyCart />
      ) : (
        <FilledCart
          cart={cart}
          handleEmptyCart={handleEmptyCart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleUpdateCartQuantity={handleUpdateCartQuantity}
        />
      )}
    </Container>
  );
}

const EmptyCart = () => {
  const classes = useStyles();

  return (
    <Typography variant='subtitle1'>
      You have no items in your cart,
      <Link to='/' className={classes.link}>
        Start adding some!
      </Link>
    </Typography>
  );
};

const FilledCart = ({
  cart,
  handleEmptyCart,
  handleRemoveFromCart,
  handleUpdateCartQuantity,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        {cart?.line_items?.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>
          Subtotal:
          {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>

          <Button
            className={classes.checkoutButton}
            size='large'
            type='button'
            variant='contained'
            color='primary'
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

Cart.propTypes = {
  cart: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array,
    ])
  ).isRequired,
  handleEmptyCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  handleUpdateCartQuantity: PropTypes.func.isRequired,
};

FilledCart.propTypes = {
  cart: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array,
    ])
  ).isRequired,
  handleEmptyCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  handleUpdateCartQuantity: PropTypes.func.isRequired,
};

export default Cart;
