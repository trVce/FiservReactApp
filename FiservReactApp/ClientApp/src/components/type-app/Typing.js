import React, { useState, useEffect } from 'react';
import Api from './Api';
import Timer from './Timer';
import FetchScores from '../FetchScores'
const Typing = () => {
    const [userID, setUserID] = useState("");
    const [inputText, setInputText] = useState("");
  
    const [quote, setQuote] = useState("");
    const [quoteId, setQuoteId] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [time, setTime] = useState(0);
  
    const [ready, setReady] = useState(false);
    const [isDone, setDone] = useState(false);

    const [timerObj, setTimerObj] = useState("");
    const [start, setStart] = useState(false);

    const [showScore, setshowScore] = useState(null);

    function handleUserIdForum(event) {
        setUserID(event.target.value);
    }

    function handleInputForum(event) {
        if (event.target.value.endsWith(quote.charAt(inputText.length))) {
            setInputText(event.target.value);
        }
        if (quote === event.target.value && quote !== "") {
            setDone(true);
            setTimerObj("");
            setInputText("");
            let score = { Username: userID, QuoteId: quoteId, Wpm: wordCount }
            const options = {
                method: 'POST',
                body: JSON.stringify(score),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch('api/Scores', options);
            setshowScore(<FetchScores quoteId={quoteId}/>);
        }
    }

    function newCard() {
        setshowScore(null);
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
        if (ready === true && userID !== "") {
            setReady(false);
        }

        if (inputText !== "") {
            let words = inputText;
            words = words.replace(/(^\s*)|(\s*$)/gi, "");
            words = words.replace(/[ ]{2,}/gi, " ");
            words = words.replace(/\n /, "\n");
            setWordCount(Math.round((words.split(' ').length / time) * 60));
        }
    }, [ready, userID, inputText, time]);

    return (
        <div className="App">

            {start ?
                <div>
                        {showScore}
                        <p>
                            <Api
                                quotefunction={setQuote}
                                quoteidfunction={setQuoteId}
                                ready={ready}
                                isDone={isDone}
                                time={time}
                            />
                        </p>
                        <p>
                            {timerObj}
                            WPM:{wordCount}
                        </p>
                            <div>
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
                        <button class="btn btn-primary" onClick={newCard}>New Quote</button>
                </div> :

                <div>
                    <h1 class="h1">
                        Typing Race
                    </h1>

                    <div className="form-group">
                        <label>
                            Username:
                        </label>

                        <input
                            class="form-control col-lg-8"
                            name="userID"
                            type="text"
                            onChange={handleUserIdForum} />
                    </div>
                    <button class="btn btn-primary" onClick={newCard}>Start</button>

                </div>

            }
            

            

        </div>
    );
};

export default Typing;