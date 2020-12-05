export const getLSValue = (key) => {
  let values = [];
  try {
    values = JSON.parse(localStorage.getItem(key));
    return values;
  } catch (error) {
    console.error("error occured", error);
    return values;
  }
};

export const setLSValue = (key, value) => {
  let values = JSON.stringify(value);
  try {
    localStorage.setItem(key, values);
  } catch (error) {
    console.error("error occured", error);
  }
};
