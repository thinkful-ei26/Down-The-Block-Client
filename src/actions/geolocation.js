import {
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_ERROR,
    FETCH_LOCATION_REQUEST
} from './types'

export const fetchLocationSuccess = coords => ({
    type: FETCH_LOCATION_SUCCESS,
    coords
});

export const fetchLocationError = err => ({
    type: FETCH_LOCATION_ERROR,
    err
});

export const fetchLocationRequest = () =>({
    type: FETCH_LOCATION_REQUEST
})

// export const fetchLocation = (dispatch, coords) => {
//     dispatch(fetchLocationRequest())
//         .then(dispatch(fetchLocationSuccess(coords)))
//         .catch(error => {
//             dispatch(fetchLocationError(error))
//         })
// }