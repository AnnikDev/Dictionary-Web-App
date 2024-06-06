// import { useState } from "react";
import "./App.css";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <Header>
        <img src="/images/logo.svg" alt="" />
        <div className="rightHeader">
          <span className="fonts">Serif</span>
          <img src="/images/icon-arrow-down.svg" alt="" />
          <div className="line"></div>
          <img src="/images/icon-moon.svg" alt="" />
        </div>
      </Header>
      <Search>
        <input type="text" placeholder="search word" />
        <button>
          <img src="/images/icon-search.svg" alt="" />
        </button>
      </Search>
      <Main>
        <ListenMode>
          <div className="word">
            <h1>word</h1>
            <span>/"k:bc:d/</span>
          </div>
          <button className="iconPlay">
            <img src="/images/icon-play.svg" alt="" />
          </button>
        </ListenMode>
        <Meaning>
          <div className="noun">
            <h1>noun</h1>
            <h2>Meaning</h2>
            <h3>Synonyms</h3>
          </div>
          <div className="verb">
            <h1>verb</h1>
            <h2>Meaning</h2>
          </div>
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

const Meaning = styled.div``;

export default App;
