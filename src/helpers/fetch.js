import fetch from 'node-fetch';

const get = async (url) => {
  try {
    const encodedUrl = encodeURI(url);

    const response = await fetch(encodedUrl);

    if (!response.ok) {
      return null;
    }

    const json = await response.json();

    console.log(json);

    return json;
  } catch (exception) {
    console.error(exception);

    return null;
  }
};

export default {
  get,
};
