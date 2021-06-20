const updateValues = <T>(original: T, toBeChanged: Record<string, unknown>) => {
  const keys = Object.keys(toBeChanged);
  keys.forEach((key) => {
    if (toBeChanged[key]) {
      original[key] = toBeChanged[key];
    }
  });
};
export default updateValues;
