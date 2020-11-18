import queryString from 'query-string';

export const convertSearchFormToQueryString = (e, formData) => {
  let search = "";

  if (formData.search.length > 0 ) {
    if (e.target.name.length > 0) {
      return search = '?' + queryString.stringify({ [e.target.name]: formData.search });
    }
  } else {
    return search;
  }
}