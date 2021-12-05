import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core';

import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

function Product({ product }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image='' title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant='h5' gutterBottom>
            {product.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            {product.price}
          </Typography>
        </div>
        <Typography variant='body2' color='textSecondary'>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label='Add to Cart'>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

// Prop types for our Component
Product.propTypes = {
  product: PropTypes.objectOf(PropTypes.object),
};

// Default Props for our Componen
Product.defaultProps = {
  product: {
    id: '1',
    name: 'dummy',
    price: '$1.0',
    description: 'dummy description',
  },
};

export default Product;