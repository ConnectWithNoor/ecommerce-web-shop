import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import useStyle from './styles';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping Address', 'Payment Details'];

const Confirmation = () => <div>Confirm</div>;

function Checkout({ cart }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyle();

  useEffect(() => {
    const generateToken = async () => {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: 'cart',
      });

      setCheckoutToken(token);
    };

    generateToken();
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const backStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = memo(
    () =>
      activeStep === 0 ? (
        <AddressForm checkoutToken={checkoutToken} next={next} />
      ) : (
        <PaymentForm shippingData={shippingData} />
        //2:42
      ),
    [activeStep]
  );

  return (
    <div>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper active={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </div>
  );
}

Checkout.propTypes = {
  cart: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array,
    ])
  ).isRequired,
};

export default Checkout;
