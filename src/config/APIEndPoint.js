const HOST = 'http://192.168.0.16:8000'
const REST_API = '/api/v1/'
const END_POINT = path => `${HOST}${path}`

export default END_POINT(REST_API)