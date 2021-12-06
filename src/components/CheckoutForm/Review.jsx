import React from 'react';
import PropTypes from 'prop-types';

import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

function Review({ checkoutToken }) {
  return (
    <div>
      <Typography variant='h6' gutterBottom>
        Order Summary
      </Typography>
      <List disablepadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: '10px 0' }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity ${product.quantity}`}
            />
            <Typography variant='body2'>
              {product.price.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </div>
  );
}

Review.propTypes = {
  checkoutToken: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array,
    ])
  ).isRequired,
};

export default Review;
