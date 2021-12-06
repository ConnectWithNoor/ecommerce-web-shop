import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

function FormInput({ name, label }) {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={() => (
          <TextField defaultValue='' fullWidth label={label} required />
        )}
        control={control}
        name={name}
      />
    </Grid>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormInput;
