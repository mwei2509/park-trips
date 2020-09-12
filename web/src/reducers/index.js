const reducers = [
];

export default function reduce (prevState, action) {
  const reducer = (state, currentFn) => currentFn(state, action);

  return reducers.reduce(reducer, { ...prevState });
}
