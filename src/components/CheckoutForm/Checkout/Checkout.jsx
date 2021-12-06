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
  CssBaseline,
} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import useStyle from './styles';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping Address', 'Payment Details'];

function Checkout({ cart, handleCaptureCheckout, order, error }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyle();
  const navigate = useNavigate();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });

        setCheckoutToken(token);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
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

  const Confirmation = memo(
    () =>
      order.customer ? (
        <div>
          <div>
            <Typography variant='h5'>
              Thank you for your purchase,
              {order.customer.firstname}
              {order.customer.lastname}
            </Typography>
            <Divider classes={classes.divider} />
            <Typography variant='subtitle2'>
              Order Reference:
              {order.customer_reference}
            </Typography>
          </div>
          <br />
          <Button variant='outlied' type='button' as={Link} to='/'>
            Back to home
          </Button>
        </div>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ),
    [order]
  );

  if (error) {
    <div>
      <Typography variant='h5'>
        Error:
        {error}
      </Typography>
      <br />
      <Button variant='outlied' type='button' as={Link} to='/'>
        Back to home
      </Button>
    </div>;
  }

  const Form = memo(
    () =>
      activeStep === 0 ? (
        <AddressForm checkoutToken={checkoutToken} next={next} />
      ) : (
        <PaymentForm
          shippingData={shippingData}
          checkoutToken={checkoutToken}
          backStep={backStep}
          handleCaptureCheckout={handleCaptureCheckout}
          nextStep={nextStep}
        />
      ),
    [activeStep]
  );

  return (
    <div>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation order={order} />
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
  order: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array,
    ])
  ).isRequired,
  handleCaptureCheckout: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default Checkout;
