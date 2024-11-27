import React, { ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface FormModel {
    [key: string]: string | number | boolean | Date | Dayjs | null;
}
interface FieldError {
  [key: string]: string | null;
}

type InputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type SelectChangeHandler = (name: string, value: unknown) => void;
type CheckboxChangeHandler = (name: string, checked: boolean) => void;
type DateFieldChangeHandler = (name: string, value: Dayjs | null) => void;

type ErrorSetter = (fieldName: string, error: string | null) => void;

interface UseGenericHandleFieldChangeProps<T extends FormModel> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  //setErrors: React.Dispatch<React.SetStateAction<FieldError>>; // Updated this line
  setErrors?: React.Dispatch<React.SetStateAction<FieldError>> | undefined;
}

const useGenericHandleFieldChange = <T extends FormModel>({
  state,
  setState,
  setErrors,
}: UseGenericHandleFieldChangeProps<T>) => {
  const handleInputChange: InputChangeHandler = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors && setErrors((prevErrors: FieldError) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSelectChange: SelectChangeHandler = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange: CheckboxChangeHandler = (name, checked) => {
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleDateFieldChange: DateFieldChangeHandler = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleDateFieldChange,
  };
};

export default useGenericHandleFieldChange;
