import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={() => <TextField fullWidth label={label} required={required} />}
        control={control}
        name={name}
      />
    </Grid>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default FormInput;
