import React, { useState, useEffect } from 'react';

const Api = (props) => {
    const [text, setText] = useState("Welcome to Typing Race");
    const [author, setAuthor] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() =>  {
        if(props.ready === true){
            const num = Math.floor(Math.random() * 15) + 1;
            const randomQuote = 'api/Quotes/' + num;
            fetch(randomQuote)
                .then(res => res.json())
                .then(res => {
                    try {
                        setText(res.quote1);
                        setAuthor(res.author);
                        props.quotefunction(res.quote1);
                        props.quoteidfunction(res.quoteId);
                        setDone(false);
                    }
                    catch (e) {

                        setText(randomQuote);
                        setAuthor(author);
                    }
                });
        }
        if(props.isDone === true){
            setDone(true);
        }
    }, [props, props.ready, props.isDone, text]);

    

    return(
        <div className={done ? "bg-success text-white border rounded" : "border rounded"}>
            <h3 class="h3">{author}</h3>
            <p>{text}</p>
            
        </div>
    );
   
};
export default Api;