import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';

function AddressForm({ checkoutToken, next }) {
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

  const subdivisionsList = Object.entries(shippingSubDivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const optionList = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`,
  }));

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

  useEffect(() => {
    const fetchSubDivisions = async () => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        shippingCountry
      );
      setShippingSubDivisions(subdivisions);
      setShippingSubDivision(Object.keys(subdivisions)[0]);
    };

    if (shippingCountry) fetchSubDivisions();
  }, [shippingCountry]);

  useEffect(() => {
    const fetchShippingOptions = async () => {
      const options = await commerce.checkout.getShippingOptions(
        checkoutToken.id,
        {
          country: shippingCountry,
          region: shippingSubDivision,
        }
      );

      setShippingOptions(options);
      setShippingOption(options[0].id);
    };

    if (shippingSubDivision) fetchShippingOptions();
  }, [shippingSubDivision]);

  return (
    <div>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubDivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name='firstName' label='First Name' />
            <FormInput name='lastName' label='Last Name' />
            <FormInput name='address1' label='Address' />
            <FormInput name='email' label='Email' />
            <FormInput name='city' label='City' />
            <FormInput name='zip' label='Zip / Postal Code' />

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

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubDivision}
                fullWidth
                onChange={(e) => setShippingSubDivision(e.target.value)}
              >
                {subdivisionsList.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Option</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {optionList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to='/cart' variant='outlined'>
              Back to Cart
            </Button>
            <Button type='submit' color='primary' variant='contained'>
              Next
            </Button>
          </div>
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
  next: PropTypes.func.isRequired,
};

export default AddressForm;
