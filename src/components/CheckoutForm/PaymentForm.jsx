import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Button, Divider } from '@material-ui/core';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

function PaymentForm({ shippingData, checkoutToken }) {
  return (
    <div>
      <Review checkoutToken={checkoutToken} />
    </div>
  );
}

PaymentForm.propTypes = {
  shippingData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
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

export default PaymentForm;
