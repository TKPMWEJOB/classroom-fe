import React from "react";

import {
    Radio,
    RadioGroup,
    FormControlLabel,
    Typography
  } from '@material-ui/core';


const renderOptions = (options) => {
  return options.map((option) => (
    <FormControlLabel
      key={option}
      value={option}
      control={<Radio color="primary"/>}
      label={option}
    />
  ));
};

const FormikRadioGroup = ({
  field,
  form: { touched, errors },
  label,
  name,
  options,
  children,
  ...props
}) => {

  const fieldName = name || field.name;

  return (
    <React.Fragment>
        <Typography variant='caption' color='secondary'>{label}</Typography>
      
      <RadioGroup {...field} {...props} name={fieldName}>
        {/* Here you either map over the props and render radios from them,
         or just render the children if you're using the function as a child*/}
        {options ? renderOptions(options) : children}
      </RadioGroup>

      {touched[fieldName] && errors[fieldName] && (
        <span style={{ color: "red", fontFamily: "sans-serif" }}>
          {errors[fieldName]}
        </span>
      )}
    </React.Fragment>
  );
};

export default FormikRadioGroup;