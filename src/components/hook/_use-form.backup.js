// This is a custom hook to receive text from input element then save to formstate
import { useState, useEffect } from 'react';
import * as Yup from 'yup';

// import custome helpers
import { currencyMask, integerMask } from './helpers';

export const useForm = (initialValue, initialErrors, schema) => {
  // set state for form inputs and errors
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState(initialErrors);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // handle callback function to set values to a formstate
  const handleChanges = (key, value, obj) => {
    let newValues = {}

    // check if nested array of objects schema: objName: [{}, {}, ...] or nested object schema: objName: {}
    if (obj) {
      // if nested array of objects schema
      if (obj.type === 'array') {
        newValues = {
          ...values,
          [obj.name]: values[obj.name].map((item, index) => { 
            if (index === obj.index) {
              return { ...item, [key]: value }
            }
            return item
          })
        }
        validateChange(key, value, obj);
      } 
      // if nested object schema
      if (obj.type === 'object') {
        newValues = {
          ...values,
          [obj.name]: { 
            ...values[obj.name], 
            [key]: value
          }
        }
        validateChange(key, value, obj);
      } 
    } else {
      newValues = {
        ...values, [key]: value
      }
      validateChange(key, value);
    }
    
    if (Object.keys(newValues).length > 0) {
      setValues(newValues);
    }
  };

  // validate an input
  const validateChange = (key, value, obj) => {
    if (obj) {
      Yup
        .reach(schema, `${obj.name}[${obj.index}].${key}`)
        .validate(value)
        .then(valid => {
          setErrors({ 
            ...errors,
            [obj.name]: errors[obj.name].map((item, index) => {
              if (index === obj.index) {
                return { ...item, [key]: "" }
              }
              return item
            })
          })
        })
        .catch(err => {
          setErrors({ 
            ...errors,
            [obj.name]: errors[obj.name].map((item, index) => {
              if (index === obj.index) {
                return { ...item, [key]: err.errors[0] }
              }
              return item
            })
          });
        })
    } else {
      Yup
      .reach(schema, key)
      .validate(value)
      .then(valid => {
        setErrors({
          ...errors, [key]: ""
        })
      })
      .catch(err => {
        setErrors({
          ...errors, [key]: err.errors[0]
        })
      });
    }
  }

  useEffect(() => {
    schema.isValid(values)
      .then(valid => {
        setButtonDisabled(!valid);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const onInputChange = (e, obj) => {
    e.persist();

    // initiate value
    let value = null;

    // if checkbox set value to be checked otherwise set value to input value
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    // currency number mask
    if (e.target.name === 'currencyInput') {
      if (value !== '' && value !== undefined) {
        value = currencyMask(e.target.value, 12);
      }
    }

    // integer number mask
    if (e.target.name === 'integerInput') {
      if (value !== '' && value !== undefined) {
        value = integerMask(e.target.value, 7);
      }
    }

    if (value !== undefined) handleChanges(e.target.id, value, obj)
  }

  return [values, errors, onInputChange, buttonDisabled, setValues];
};