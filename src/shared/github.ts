 const getByUrl = async <T>(url: string) => {
  return await fetch(
   url,
    {
      headers: {
        Authorization: "Bearer " + process.env.GIT_AUTH,
      },
    }
  ).then((res) => res.json()) as T;
}

export { getByUrl }