import React from 'react';
import RegisterView from './register.view';
import { history } from '../../@core/navigation';

export function Register({ modulePath }) {
    function goToLogin() {
        history.push(`${modulePath}/login`);
    }

    return <RegisterView ctrl={{ goToLogin }} />;
}
