import React, { useState, useEffect } from 'react';
import Api from './Api';
import Timer from './Timer';
const Typing = () => {
  const [userID, setUserID] = useState("");
  const [token, setToken] = useState("");
  const [inputText, setInputText] = useState("");
  
  const [quote, setQuote] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [time, setTime] = useState(0);
  
  const [ready, setReady] = useState(false);
  const [isDone, setDone] = useState(false);

  const [timerObj, setTimerObj] = useState("");
  const [start, setStart] = useState(false);
  function handleUserIdForum(event) {
    setUserID(event.target.value);
  }

  function handleTokenForum(event) {
    setToken(event.target.value);
  }

  function handleInputForum(event) {
    if (event.target.value.endsWith(quote.charAt(inputText.length))) {
      setInputText(event.target.value);
    }
    if (quote === event.target.value && quote !== "") {
      setDone(true);
      setTimerObj("");
      setInputText("");
    }
  }

  function newCard() {
    setStart(true);
    setReady(!ready);
    setInputText("");
    setDone(false);
    setWordCount(0);
    if (timerObj === ""){
      setTimerObj(<Timer timeFunction={setTime} />);
    } else {
      setTimerObj("");
    }
  }

  useEffect(() => {
    if (ready === true && userID !== "" && token !== "") {
        setReady(false);
    }

    if (inputText !== "") {
      let words = inputText;
      words = words.replace(/(^\s*)|(\s*$)/gi, "");
      words = words.replace(/[ ]{2,}/gi, " ");
      words = words.replace(/\n /, "\n");
      setWordCount(Math.round((words.split(' ').length / time) * 60));
    }
  }, [ready, token, userID, inputText, time]);

  return (
    <div className="App">
      <header className="App-header">

        <h1>
          Typing Race
        </h1>
        
        <div className="form-group">
          <label>
            userID:
          </label>
            <input
            class="form-control"
            name="userID"
            type="text"
            onChange={handleUserIdForum} />
        </div>

        <div className="form-group">
          <label>
            token:
            </label>
            <input
            class="form-control"
            name="token"
            type="password"
            onChange={handleTokenForum} />
        </div>

        <button class="btn btn-primary" onClick={newCard}>New Card</button>
      </header>

      <body className="App-body">
        <p>
          <Api
            usr={userID}
            tkn={token}
            quotefunction={setQuote}
            ready={ready}
            isDone={isDone}
            time={time} 
            />
        </p>
        {start ? <p>
          {timerObj}
          WPM:{wordCount}
        </p>
        : null}
        {start ? 
          <div className="App-text-entry">
          <label>
            Type Here:
          </label>
          <input
            class="form-control"
            type="text"
            name="inputText"
            value={inputText}
            onChange={handleInputForum} />
          </div> 
        : null}
        
      </body>

    </div>
  );
};

export default Typing;