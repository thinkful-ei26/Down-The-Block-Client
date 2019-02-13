import {
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_ERROR,
} from './types'

export const fetchLocationSuccess = location => ({
    type: FETCH_LOCATION_SUCCESS,
    location
});

export const fetchLocationError = err => ({
    type: FETCH_LOCATION_ERROR,
    err
});

