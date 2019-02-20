import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const registerUser = user => dispatch => {
    let formData = new FormData();
    console.log('formData', formData);

    Object.keys(user).forEach(item=> {
        formData.append(item, (user[item]))
    });

    for (let pair of formData.entries()) {
        console.log('DATA', pair[0]+ ', ' + pair[1]); 
    }

    return fetch(`${API_BASE_URL}/auth/users`, {
        method: 'POST',
        body: formData
    })
        .then(res => normalizeResponseErrors(res))
        .then(res =>{ 
            res.json();
        })
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};