const url = "https://api.dictionaryapi.dev/api/v2/entries/en";

export const fetchDictionaryApi = (word) => {
  return fetch(`${url}/${word}`);
};
