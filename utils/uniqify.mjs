export default function (array, key) {
  return array.reduce(
    (prev, curr) =>
      prev.find((a) => a[key] === curr[key]) ? prev : prev.push(curr) && prev,
    []
  );
}
