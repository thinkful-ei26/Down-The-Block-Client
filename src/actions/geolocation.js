import {
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_ERROR,
} from './types'

export const fetchLocationSuccess = coords => ({
    type: FETCH_LOCATION_SUCCESS,
    coords
});

export const fetchLocationError = err => ({
    type: FETCH_LOCATION_ERROR,
    err
});