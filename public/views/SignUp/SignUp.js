'use strict';

import SignUpForm from '../../components/Form/Form/SignUpForm';
import ValidSignUpForm from '../../components/Form/ValidForm/ValidSignUpForm';

let data = {
    title: 'SIGN UP',
	classForm: 'block-form__signup-form',
    fields: [
        {
            attrs: {
                type: 'text',
                name: 'username',
                placeholder: 'Enter username',
            },
        },
        {
            attrs: {
                type: 'text',
                name: 'email',
                placeholder: 'Enter email',
            },
        },
        {
            attrs: {
                type: 'password',
                name: 'password',
                placeholder: 'Enter password',
            },
        },
        {
            attrs: {
                type: 'password',
                name: 'repeatPassword',
                placeholder: 'Repeat password',
            },
        }],
    buttons: [
        {
            attrs: {
                type: 'submit',
                class: 'block-form__submit-data',
                value: 'SIGN UP',
                id: 'signUp-button-signUp',
            },
        },
        {
            attrs: {
                class: 'block-form__back-button',
                value: 'BACK',
                id: 'signUp-button-back',
            },
        },
    ]
};

/**
 * Получаем страницу регистрации
 */
export default function SignUp() {
    return new SignUpForm('section', {id: 'section-signUp'}, [], {data}, ValidSignUpForm);
}

