export const storageServices = {
  setAuthData: (authData) => {
    localStorage.setItem('joindev@authdata', JSON.stringify(authData));
  },
  getAuthData: () => {
    const authData = localStorage.getItem('joindev@authdata');
    return JSON.parse(authData);
  },
  cleanStorage: () => {
    localStorage.removeItem('joindev@authdata');
  },
};
