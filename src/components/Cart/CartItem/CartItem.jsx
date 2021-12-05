import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';

import useStyles from './styles';

function CartItem({ item }) {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={item.image.url}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='h5'>{item.price.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button type='button' size='small'>
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button type='button' size='small'>
            +
          </Button>
        </div>
        <Button variant='contained' type='button' color='secondary'>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

CartItem.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array,
    ])
  ).isRequired,
};

export default CartItem;
