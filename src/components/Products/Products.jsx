import React from 'react';
import Grid from '@material-ui/core/Grid';

import Product from './Product/Product';

import useStyles from './styles';

const productList = [
  {
    id: 1,
    name: 'Shoes',
    description: 'Running Shoes',
    price: '$5',
  },
  {
    id: 2,
    name: 'iPhone',
    description: 'Running iPhone',
    price: '$10',
  },
];

function Products() {
  const classes = useStyles();

  return (
    <main classes={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify='center' spacing={4}>
        {productList.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={p} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
