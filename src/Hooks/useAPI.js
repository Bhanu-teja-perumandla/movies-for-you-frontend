import { useState } from "react";

export const makeApiCall = async (url, method='GET', body=null, auth=true) => {
  let headers = {
    "Content-Type": "application/json",
  };
  if(auth) {
    headers['Authorization'] = "Bearer " + localStorage.getItem("token");
  }
  let options = {
    method,
    headers
  };
  if(body) {
    options.body = JSON.stringify(body);
    console.log("body after json: " + JSON.stringify(options));
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (e) {
    console.error("API Error:", e);
    return { error: e.message }; 
  }
};

export const api = {
  get: (url, auth) => makeApiCall(url, 'GET', null, auth),
  post: (url, body, auth) => makeApiCall(url, 'POST', body, auth),
  put: (url, body, auth) => makeApiCall(url, 'PUT', body, auth),
};

export function useAPI() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const makeRequest = async (url, reqType='movies', body = null) => {
    let req = null;
    switch (reqType) {
      case 'movies': req = await api.get(url, false); break;
      case 'signin': req = await api.post(url, body, false); break;
      case 'signup': req = await api.post(url, body); break;
      default: req = await api.get(url); break;
    }
    if(req.error) {
      setError(req.error);
      setData(null);
    } else {
      setData(req);
      setError(error);
    }
  };

  return { data, error, makeRequest};
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
