import { useState } from "react";

// useForm functional componen
export const useForm = (callback: any, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    // onChange
    const onChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        //console.log(values);
        await callback(values)

    };



    // onSubmit
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //console.log(values);
        await callback(values); // triggering the callback

    };

    

    // return values
    return {
        onChange,
        onSubmit,
        values,
    };
}