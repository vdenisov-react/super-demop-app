import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { get } from 'lodash';

import LoginView from './login.view';
import { history } from '../../@core/navigation';
import { EMAIL_PATTERN } from '../../@shared/constants';

// services
import { LocalStorageService } from '../../@core/services';
import { AuthService } from '../../@core/api/services';

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

export function Login({ modulePath, onLogIn }) {
    // services
    const authService = new AuthService();
    const localStorageService = new LocalStorageService();
    // ---

    const { register: formControl, handleSubmit, errors: formErrors } = useForm({
        defaultValues: { email: '', password: '' },
    });

    const formControls = {
        email: formControl({ ...FORM_VALIDATION.EMAIL }),
        password: formControl({ ...FORM_VALIDATION.PASSWORD }),
    };

    const [loginError, setLoginError] = useState('');

    function onProcessLogin(data) {
        const { email, password } = data;
        authService
            .login(email, password)
            .then(res => {
                const token = get(res, 'data.id_token') || null;
                if (token) {
                    localStorageService.set('token', token);
                    setLoginError('');
                    onLogIn();
                }
            })
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
