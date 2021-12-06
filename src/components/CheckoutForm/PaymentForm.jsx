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

function PaymentForm({
  shippingData,
  checkoutToken,
  backStep,
  handleCaptureCheckout,
  nextStep,
  timeout,
}) {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      const orderData = {
        list_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubDivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {
          shipping_method: shippingData.shippingOption,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      await handleCaptureCheckout(checkoutToken.id, orderData);
      timeout();
      nextStep();
    }
  };

  return (
    <div>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' onClick={backStep}>
                  Back
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={!stripe}
                  color='primary'
                >
                  Pay
                  {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
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
  backStep: PropTypes.func.isRequired,
  handleCaptureCheckout: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  timeout: PropTypes.func.isRequired,
};

export default PaymentForm;
