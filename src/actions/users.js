import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const registerUser = user => dispatch => {
    let formData = new FormData();
    
    Object.keys(user).forEach(item=> {
        if(item==="img" && user[item].public_id){
            formData.append('public_id', user[item].public_id)
            formData.append('url', user[item].url)
        }
        else{
            formData.append(item, (user[item]))
        }
    });

    for (let pair of formData.entries()) {
        console.log('DATA', pair[0]+ ', ' + pair[1]); 
    }

    console.log(formData);

    return fetch(`${API_BASE_URL}/auth/users`, {
        method: 'POST',
        // headers: {
        //     'content-type': 'application/json'
        // },
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