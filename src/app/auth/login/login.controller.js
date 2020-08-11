import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import LoginView from './login.view';
import { history } from '../../@core/navigation';

const API_URL = 'http://193.124.114.46:3001';

const EMAIL_PATTERN = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const FORM_VALIDATION = {
    EMAIL: {
        required: { value: true, message: 'Email is required!' },
        minLength: { value: 5, message: 'Email is too small!' },
        maxLength: { value: 50, message: 'Email is too large!' },
        pattern: { value: EMAIL_PATTERN, message: 'Wrong format!' },
    },
    PASSWORD: {
        required: { value: true, message: 'Password is required!' },
        minLength: { value: 5, message: 'Password is too small!' },
        maxLength: { value: 50, message: 'Password is too large!' },
    },
};

const DEFAULT_VALUES = {
    EMAIL: '',
    PASSWORD: '',
};

export function Login({ modulePath }) {
    const { register: formControl, handleSubmit, errors: formErrors } = useForm({
        defaultValues: {
            email: DEFAULT_VALUES.EMAIL,
            password: DEFAULT_VALUES.PASSWORD,
        },
    });

    const formControls = {
        email: formControl({ ...FORM_VALIDATION.EMAIL }),
        password: formControl({ ...FORM_VALIDATION.PASSWORD }),
    };

    const [loginError, setLoginError] = useState('');

    function onProcessLogin(data) {
        setLoginError('');
        axios
            .post(`${API_URL}/sessions/create`, data)
            .then(res => console.log('RES =>', res.data))
            .catch(err => setLoginError(err.message || 'Unexpected login error'));
    }

    function goToRegister() {
        history.push(`${modulePath}/register`);
    }

    return (
        <LoginView
            ctrl={{
                formControls,
                formErrors,
                loginError,
                // ---
                handleSubmit,
                onProcessLogin,
                goToRegister,
            }}
        />
    );
}
