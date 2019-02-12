export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';
export const fetchLocationSuccess = location => ({
    type: FETCH_LOCATION_SUCCESS,
    location
});

export const FETCH_LOCATION_ERROR = 'FETCH_LOCATION_ERROR';
export const fetchLocationError = err => ({
    type: FETCH_LOCATION_ERROR,
    err
});

