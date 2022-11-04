export const required = (str = null) => {
  return str ? str.trim().length > 0 : false;
};
