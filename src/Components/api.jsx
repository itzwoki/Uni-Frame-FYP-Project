
let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://192.168.18.55:5000/api'; // Local development server
} else if (process.env.REACT_APP_ANDROID_EMULATOR) {
  baseURL = 'http://192.168.18.55:3000'; // Android emulator
}

export default baseURL;
