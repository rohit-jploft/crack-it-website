export const isAuthenticated = () => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};
export const isUser = () => {
  const role = localStorage.getItem('role')
  if (role?.toString() === "USER") {
    return true;
  }
  return false;
};
export const isExpert = () => {
  const role = localStorage.getItem('role')
  if (role?.toString() === "EXPERT") {
    return true;
  }
  return false;
};


