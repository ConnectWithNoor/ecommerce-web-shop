import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';

function AddressForm({ checkoutToken }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubDivision, setShippingSubDivision] = useState('');
  const [shippingOption, setShippingOption] = useState('');

  const methods = useForm();

  const countriesList = Object.entries(shippingCountries).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  useEffect(() => {
    const fetchShippingCountries = async () => {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutToken.id
      );

      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    };

    fetchShippingCountries();
  }, []);

  return (
    <div>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form>
          <Grid container spacing={3}>
            <FormInput name='firstName' label='First Name' required />
            <FormInput name='lastName' label='Last Name' required />
            <FormInput name='address1' label='Address' required />
            <FormInput name='email' label='Email' required />
            <FormInput name='city' label='City' required />
            <FormInput name='zip' label='Zip / Postal Code' required />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countriesList.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={} fullWidth onChange={}>
              <MenuItem key={} value={}>Select Me</MenuItem>
              </Select>
            </Grid> */}

            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Option</InputLabel>
              <Select value={} fullWidth onChange={}>
              <MenuItem key={} value={}>Select Me</MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}

AddressForm.propTypes = {
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

export default AddressForm;
