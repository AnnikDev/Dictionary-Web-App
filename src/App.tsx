import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
}

interface DictionaryEntry {
  word: string;
  phonetic: string;
  sourceUrls: string[];
  meanings: Meaning[];
}

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dictionaryData, setDictionaryData] = useState<DictionaryEntry[]>([
    {
      word: "Dictionary",
      phonetic: "/ˈdɪkʃəˌnɛɹi/",
      sourceUrls: [""],
      meanings: [],
    },
  ]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respo = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`
        );
        const data: DictionaryEntry[] = await respo.json();

        if (!respo.ok) throw new Error("something went wrong");

        setDictionaryData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchQuery.length > 2) {
      fetchData();
    }
  }, [searchQuery]);

  console.log(dictionaryData[0]?.["meanings"]);

  const nounMeanings = dictionaryData[0]?.meanings.filter(
    (meaning) => meaning.partOfSpeech === "noun"
  );

  const verbMeanings = dictionaryData[0]?.meanings.filter(
    (meaning) => meaning.partOfSpeech === "verb"
  );

  return (
    <Container>
      <Header>
        <img src="/images/logo.svg" alt="logo" />
        <div className="rightHeader">
          <span className="fonts">Serif</span>
          <img src="/images/icon-arrow-down.svg" alt="arrow" />
          <div className="line"></div>
          <img src="/images/icon-moon.svg" alt="moon" />
        </div>
      </Header>
      <Search>
        <input type="text" placeholder="search word" onChange={handleInput} />
        <button>
          <img src="/images/icon-search.svg" alt="search" />
        </button>
      </Search>
      <Main>
        <ListenMode>
          <div className="word">
            <h1>{dictionaryData[0]?.word}</h1>
            <span>{dictionaryData[0]?.phonetic}</span>
          </div>
          <button className="iconPlay">
            <img src="/images/icon-play.svg" alt="play" />
          </button>
        </ListenMode>
        <Meaning>
          {nounMeanings.map((meaning, index) => (
            <div key={index} className={meaning.partOfSpeech}>
              <div className="header">
                <h1>{meaning.partOfSpeech}</h1>
                <HLine />
              </div>
              <h2>Meaning</h2>
              <ul>
                {meaning.definitions.map((definition, defIndex) => (
                  <li key={defIndex}>{definition.definition}</li>
                ))}
              </ul>
              {meaning.synonyms.length > 0 && (
                <Synonyms>
                  <h3>Synonyms</h3>
                  <p>
                    {meaning.synonyms.map((synonym, synIndex) => (
                      <span key={synIndex}>{synonym}</span>
                    ))}
                  </p>
                </Synonyms>
              )}
            </div>
          ))}
          {verbMeanings.map((meaning, index) => (
            <div key={index} className={meaning.partOfSpeech}>
              <div className="header">
                <h1>{meaning.partOfSpeech}</h1>
                <HLine />
              </div>
              <h2>Meaning</h2>
              <ul>
                {meaning.definitions.map((definition, defIndex) => (
                  <li key={defIndex}>{definition.definition}</li>
                ))}
                <p className="example">
                  {dictionaryData[0]?.["meanings"][1].definitions[0].example}
                </p>
              </ul>
              {meaning.synonyms.length > 0 && (
                <Synonyms>
                  <h3>Synonyms</h3>
                  <p>
                    {meaning.synonyms.map((synonym, synIndex) => (
                      <span key={synIndex}>{synonym}</span>
                    ))}
                  </p>
                </Synonyms>
              )}
            </div>
          ))}
          <HLine />
          <SourceLink>
            Source
            <a href={dictionaryData[0]?.sourceUrls[0]}>
              {dictionaryData[0]?.sourceUrls[0]}
              <img src="/images/icon-new-window.svg" alt="new window" />
            </a>
          </SourceLink>
        </Meaning>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100rem;
  margin: auto;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .rightHeader {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .fonts {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }

  .line {
    height: 2.2rem;
    width: 0.1rem;
    background-color: #0000002b;
  }
`;

const Search = styled.div`
  display: flex;

  input {
    width: 100%;
    background-color: #00000011;
    height: 4rem;
    font-size: 1.4rem;
    color: black;
    font-weight: 600;
    padding: 1.8rem;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
    border: none;
    outline: none;
  }

  button {
    padding-right: 1.8rem;
    border-top-right-radius: 30%;
    border-bottom-right-radius: 30%;
  }
`;

const Main = styled.div``;

const ListenMode = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;

  h1 {
    font-size: 7rem;
  }

  span {
    font-size: 2rem;
    color: #a445ed;
  }

  .iconPlay {
    background-color: inherit;
  }
`;

const HLine = styled.div`
  height: 0.1rem;
  width: 100%;
  background-color: #d4c9c937;
`;

const Meaning = styled.div`
  h1,
  h2,
  h3 {
    font-size: 1.6rem;
    color: #0000002b;
    margin-bottom: 1rem;
  }

  h1 {
    color: black;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 2rem auto;
  }

  ul {
    list-style-type: none;
    padding-left: 2rem;
  }

  li {
    font-size: 1.4rem;
    padding: 1rem 0;
    list-style-type: disc;
    &::marker {
      color: #a445ed;
    }
  }

  .example {
    font-size: 1.4rem;
    color: #0000002b;
    margin-bottom: 2rem;
  }
`;

const Synonyms = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
  p {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
  }
  span {
    color: #a445ed;
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

const SourceLink = styled.div`
  font-size: 1.2rem;
  color: #0000002b;
  display: flex;
  gap: 2rem;
  align-items: center;
  margin: 2rem auto;

  a {
    color: black;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export default App;
