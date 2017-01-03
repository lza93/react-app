export default trueOrFalse => new Promise((resolve, reject) => {
  if (trueOrFalse !== false) { resolve('generated Promise resolved'); }
  reject('generated Promise rejected');
});

export const resolvedPromise = () => new Promise((resolve) => {
  resolve('generated Promise resolved');
});

export const rejectedPromise = () => new Promise((resolve, reject) => {
  reject('generated Promise rejected');
});
