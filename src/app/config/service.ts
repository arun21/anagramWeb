export const dev = {
  baseUrl: 'http://localhost:9000/',
  endpoint: {
    registerUrl: 'register',
    popularCountsUrl: 'counts',
    verifyUrl: 'verify',
    checkAnagram: 'check-anagram',
    loginUrl: 'login',
    checkUserUrl: 'checkUser'
  }
};

export const prod = {
  baseUrl: 'https://anagram-check.herokuapp.com/',
  endpoint: {
    registerUrl: 'register',
    popularCountsUrl: 'counts',
    verifyUrl: 'verify',
    checkAnagram: 'check-anagram',
    loginUrl: 'login',
    checkUserUrl: 'checkUser'
  }
};
