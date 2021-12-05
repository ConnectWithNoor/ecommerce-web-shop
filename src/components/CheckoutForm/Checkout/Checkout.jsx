import React, { useState, memo } from 'react';
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

const steps = ['Shipping Address', 'Payment Details'];

const Confirmation = () => <div>Confirm</div>;

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const classes = useStyle();

  const Form = memo(
    () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />),
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
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </div>
  );
}

export default Checkout;
