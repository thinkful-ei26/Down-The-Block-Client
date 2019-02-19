import {REACT_APP_GOOGLE_API_KEY} from '../src/credentials'

export const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || REACT_APP_GOOGLE_API_KEY;

