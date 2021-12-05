import React from 'react';
import Proptypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  //   MenuItem,
  //   Menu,
  Typography,
} from '@material-ui/core';

import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/commerce.png';
import useStyles from './styles';

function Navbar({ totalItems }) {
  const classes = useStyles();
  return (
    <div>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography variant='h6' className={classes.title} color='inherit'>
            <img
              src={logo}
              alt='e-commerce web shop'
              height='25px'
              className={classes.image}
            />
            Commerce.js
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label='Show Cart Items' color='inherit'>
              <Badge badgeContent={totalItems} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  totalItems: Proptypes.number,
};

Navbar.defaultProps = {
  totalItems: 0,
};

export default Navbar;
