import React, { useState, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
interface FormModel {
  [key: string]: string | number | boolean | Date | Dayjs | null;
}

type InputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type SelectChangeHandler = (name: string, value: unknown) => void;
type CheckboxChangeHandler = (name: string, checked: boolean) => void;
type DateFieldChangeHandler = (name: string, value: Dayjs | null) => void;

const useHandleFieldChange = <T extends FormModel>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);

  const handleInputChange: InputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSelectChange: SelectChangeHandler = (name, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleCheckboxChange: CheckboxChangeHandler = (name, checked) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: checked,
    }));
  };

  const handleDateFieldChange: DateFieldChangeHandler = (name, value) => {
    // Parse the value to a Dayjs object
    const parsedDate = value ? dayjs(value) : null;
  
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: parsedDate,
    }));
  };

  return {
    formState,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleDateFieldChange
  };
};

export default useHandleFieldChange;
