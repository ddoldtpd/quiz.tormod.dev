export const catchAsync = fn => {
  try {
    return fn();
  } catch (e) {
    return console.log(e);
  }
};
