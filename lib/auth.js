export const saveUserToStorage = (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  };
  
  export const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || 'null');
    }
    return null;
  };
  
  export const removeUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };
  
  export const isAuthenticated = () => {
    const user = getUserFromStorage();
    return !!user;
  };
  
  export const isBookOwner = () => {
    const user = getUserFromStorage();
    return user && user.role === 'owner';
  };