import { useEffect, useState } from "react";
import "./style/index.scss";
import { fetchDictionaryApi } from "./service/fetchApi";

function App() {
  const [word, setWord] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [search, setSearch] = useState(false);
  const [theme, setTheme] = useState("light");

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  const searchWord = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetchDictionaryApi(word);
      const data = await resp.json();
      if (data) {
        setSearchResult(data[0]);
        setSearch(true);
        console.log(searchResult);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toogleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <button onClick={toogleTheme}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
      <h1>Dictionary</h1>
      <p>Search a word</p>
      <form onSubmit={searchWord}>
        <input type="text" value={word} onChange={handleWordChange} />
        <button type="submit">Search</button>
      </form>
      {search && (
        <>
          <div>
            <h2>{searchResult.word}</h2>
          </div>
          <div className="api__content">
            {searchResult?.phonetics.map((phonetic, index) => (
              <div key={index}>
                <p>{phonetic.text}</p>
              </div>
            ))}

            {searchResult?.meanings.map((meaning, index) => (
              <div key={index}>
                <p className="title">{meaning.partOfSpeech}</p>
                {meaning.definitions?.map(({ definition }, index) => (
                  <ul key={index}>
                    <li>{definition}</li>
                  </ul>
                ))}
              </div>
            ))}

            {searchResult?.sourceUrls.map((source, index) => (
              <div key={index}>
                <p className="source__url">Source:</p>
                <a href={source} target="_blank">
                  {source}
                </a>
              </div>
            ))}

            {searchResult?.license.name && (
              <div className="source__license">
                <p>License:</p>
                <a href={searchResult.license.url} target="_blank">
                  {searchResult.license.name} - {searchResult.license.url}
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
