import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Product from './Product/Product';
import useStyles from './styles';

function Products({ productsList, onAddToCart }) {
  const classes = useStyles();

  return (
    <main classes={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent='center' spacing={4}>
        {productsList.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={p} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

Products.propTypes = {
  productsList: PropTypes.instanceOf(Array),
  onAddToCart: PropTypes.func,
};

Products.defaultProps = {
  productsList: [
    {
      id: '1',
      name: 'dummy',
      price: '$1.0',
      description: 'dummy description',
    },
  ],
  onAddToCart: () => {},
};

export default Products;
