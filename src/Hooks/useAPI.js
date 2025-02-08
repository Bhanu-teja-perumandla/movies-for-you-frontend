import { useEffect, useState } from "react";

export const makeApiCall = async (url) => {
  let data = [];
  try {
    let raw_response = await fetch(url);
    data = await raw_response.json();
  } catch (e) {
    console.log("error" + e);
  }
  return data;
};

export function useAPI(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    makeApiCall(url).then((data) => {
      setData(data);
    });
  }, [url]);

  return { data };
}

export function getMoviesFrom(data) {
  console.log(data)
  return data.map((movie) => {
    return {
      id: movie.id,
      movieName: movie.title,
      rating: movie.rating,
      poster: movie.poster,
      description: movie.description,
    };
  });
}
