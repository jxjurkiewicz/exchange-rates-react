export function getParams(paramsObj) {
  return new URLSearchParams({
    access_key: import.meta.env.VITE_API_ACCESS_KEY,
    ...paramsObj,
  });
}
