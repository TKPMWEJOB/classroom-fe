import React from "react";
import { useField, useFormikContext } from "formik";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
    TextField
  } from '@material-ui/core';

function DatePickerField ({ ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
        <DesktopDatePicker        
        inputFormat="dd/MM/yyyy"
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
            setFieldValue(field.name, val);
        }}
        renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
};

export default DatePickerField;