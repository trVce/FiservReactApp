import React, { useState, useEffect } from 'react';

const Api = (props) => {
    const [text, setText] = useState("Welcome to Typing Race");
    const [author, setAuthor] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() =>  {
        if(props.ready === true){
            const url = "https://www.abbreviations.com/services/v2/quotes.php?uid=" + props.usr +
                "&tokenid=" + props.tkn + "&searchtype=RANDOM&format=json";
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    try {
                        setText(res.result.quote);
                        setAuthor(res.result.author);
                        props.quotefunction(res.result.quote);
                        setDone(false);
                    }
                    catch (e) {
                        setText("Please check UserID and Token");
                        setAuthor("Error");
                    }
                });
        }
        if(props.isDone === true){
            setDone(true);
        }
    }, [props, props.ready, props.isDone, text]);

    

    return(
        <div className={done ? "FinishedCard" : "TextCard"}>
            <h2 class="h2">{author}</h2>
            <p>{text}</p>
            
        </div>
    );
   
};
export default Api;