import fetch from 'node-fetch';

const fetchGet = async (url) => {
  const encodedUrl = encodeURI(url);

  try {
    const response = await fetch(encodedUrl);

    const json = await response.json();

    return json;
  } catch (error) {
    return null;
  }
};

export default {
  fetchGet,
};
