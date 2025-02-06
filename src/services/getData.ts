export const getData = async () => {
  const res = await fetch("http://localhost:3000/api/get");
  const { data } = await res.json();
  return data;
};
