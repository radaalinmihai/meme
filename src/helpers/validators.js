import * as Yup from 'yup';

export const LoginValidator = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export const RegisterValidator = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().required('A password is required'),
    retypePassword: Yup.string().required('Passwords must match')
});