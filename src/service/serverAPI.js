import axios from 'axios'
import APIEndPoint from '../config/APIEndPoint'
import { AsyncStorage } from 'react-native'

export default axios.create({
    'baseURL': APIEndPoint,
    'timeout': 5000,
    'headers': {
        'common': {
            'Authorization': `Bearer ${AsyncStorage.getItem('photogram_token') || ''}}`,
        },
        // POST, PUT, DELETE, PATCH bassicly is a POST 
        'post': {
            'Content-Type': 'application/json',
        }
    }
})