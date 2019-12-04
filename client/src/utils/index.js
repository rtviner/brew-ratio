const stepDownValue = (value, factor) => {
  if (value < factor) return 0;
  return value - factor;
};  

const stepUpValue = (value, factor) => {
  return value + factor;
};

export {stepDownValue, stepUpValue};