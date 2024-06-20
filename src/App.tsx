import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

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

  const [isChecked, setIsChecked] = useState(false);

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
    <Container isChecked={isChecked}>
      <GlobalStyle darkMode={isChecked} />
      <Header>
        <img src="/images/logo.svg" alt="logo" />
        <div className="rightHeader">
          <span className="fonts">Serif</span>
          <img src="/images/icon-arrow-down.svg" alt="arrow" />
          <div className="line"></div>
          <Switch>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span className="slider round"></span>
          </Switch>
          <svg
            className={`moon ${isChecked ? "checked" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
            />
          </svg>
        </div>
      </Header>
      <Search isChecked={isChecked}>
        <input type="text" placeholder="search word" onChange={handleInput} />
        <button>
          <img src="/images/icon-search.svg" alt="search" />
        </button>
      </Search>

      <ListenMode>
        <div className="word">
          <h1>{dictionaryData[0]?.word}</h1>
          <span>{dictionaryData[0]?.phonetic}</span>
        </div>
        <button className="iconPlay">
          <img src="/images/icon-play.svg" alt="play" />
        </button>
      </ListenMode>
      <Meaning isChecked={isChecked}>
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
                {dictionaryData[0]?.meanings[1]?.definitions[0]?.example}
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
        <SourceLink isChecked={isChecked}>
          Source
          <a href={dictionaryData[0]?.sourceUrls[0]}>
            {dictionaryData[0]?.sourceUrls[0]}
            <img src="/images/icon-new-window.svg" alt="new window" />
          </a>
        </SourceLink>
      </Meaning>
    </Container>
  );
}

const Container = styled.div<{ isChecked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100rem;
  margin: auto;
  padding: 2rem;
  gap: 2rem;
  background-color: ${(props) => (props.isChecked ? "#1c1c1c" : "#ffffff")};
  color: ${(props) => (props.isChecked ? "#ffffff" : "#000000")};
  transition: background-color 0.4s, color 0.4s;
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

  .moon {
    stroke: #838383;
    transition: stroke 0.4s;
  }

  .moon.checked {
    stroke: #a445ed;
  }

  @media screen and (max-width: 500px) {
    height: 3rem;

    .rightHeader {
      gap: 1rem;

      .fonts {
        font-size: 1.2rem;
      }
    }
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 6rem;
  height: 3.4rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 2.6rem;
    width: 2.6rem;
    left: 0.4rem;
    bottom: 0.4rem;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #a445ed;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #a445ed;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 3.4rem;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  @media screen and (max-width: 500px) {
    width: 5rem;
    height: 2.4rem;

    .slider:before {
      height: 2rem;
      width: 2rem;
      left: 0.2rem;
      bottom: 0.2rem;
    }
  }
`;

const Search = styled.div<{ isChecked: boolean }>`
  display: flex;

  input {
    width: 100%;
    background-color: #00000011;
    height: 4rem;
    font-size: 1.4rem;
    color: ${(props) => (props.isChecked ? "#ffffff" : "#0000000")};
    font-weight: 600;
    padding: 1.8rem;
    border-radius: 1rem;
    border: none;
    outline: none;
  }

  button {
    transform: translateX(-30px);
    background-color: inherit;
  }
`;

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

  @media screen and (max-width: 800px) {
    margin-bottom: 1rem;
    h1 {
      font-size: 4rem;
    }

    span {
      font-size: 1rem;
    }

    .iconPlay img {
      width: 6rem;
    }
  }

  @media screen and (max-width: 375px) {
    h1 {
      font-size: 3rem;
    }

    .iconPlay img {
      width: 4.5rem;
    }
  }
`;

const HLine = styled.div`
  height: 0.1rem;
  width: 100%;
  background-color: #d4c9c937;
`;

const Meaning = styled.div<{ isChecked: boolean }>`
  h1,
  h2,
  h3 {
    font-size: 1.6rem;
    color: ${(props) => (props.isChecked ? "#fffbfb52" : "#0000004e")};
  }

  h1 {
    color: ${(props) => (props.isChecked ? "#fffbfb" : "#000000")};
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
    margin-top: 2rem;
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

  @media screen and (max-width: 500px) {
    h1,
    h2,
    h3 {
      font-size: 1.4rem;
    }

    li {
      font-size: 1.2rem;
    }
  }
`;

const Synonyms = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
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

  @media screen and (max-width: 500px) {
    span {
      font-size: 1.2rem;
    }
  }
`;

const SourceLink = styled.div<{ isChecked: boolean }>`
  font-size: 1.2rem;
  color: ${(props) => (props.isChecked ? "#ffffff6b" : "#0000004e")};
  display: flex;
  gap: 2rem;
  align-items: center;
  margin: 2rem auto;

  a {
    color: ${(props) => (props.isChecked ? "#ffffffb8" : "#000000cb")};
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const GlobalStyle = createGlobalStyle<{ darkMode: boolean }>`
  body {
    background-color: ${(props) => (props.darkMode ? "#1c1c1c" : "#ffffff")};
    color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
    transition: background-color 0.4s, color 0.4s;
  }
`;

export default App;
