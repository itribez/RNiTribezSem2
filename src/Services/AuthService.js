import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://itribez-node-apis.onrender.com';

const login = async (email, password) => {
  const payload = {
    email,
    password,
  };

  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  if (data.token) {
    await AsyncStorage.setItem('data', JSON.stringify(data));
    return { success: true, data };
  } else {
    return { success: false, message: data.message };
  }
};

const checkForStoredToken = async () => {
  const data = await AsyncStorage.getItem('data');
  return data ? JSON.parse(data) : null;
};

const register = async (email, password) => {
  const payload = {
    email,
    password,
  };

  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      // Assume if there's a token, registration was successful
      if (data.token) {
        return { success: true, token: data.token };
      } else {
        // Handle case where no token is returned, but response is ok
        return { success: false, message: 'Registration was successful, but no token was received.' };
      }
    } else {
      // Handle HTTP errors
      return { success: false, message: data.message || 'Registration failed due to an unknown error.' };
    }
  } catch (error) {
    // Handle network errors or other errors that prevented the request from completing
    return { success: false, message: error.message || 'An error occurred during registration.' };
  }
};

export default {
  login,
  checkForStoredToken,
  register,
};
