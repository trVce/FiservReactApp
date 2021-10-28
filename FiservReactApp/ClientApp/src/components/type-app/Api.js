import React, { useState, useEffect } from 'react';

const Api = (props) => {
    const [text, setText] = useState("Welcome to Typing Race");
    const [author, setAuthor] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() =>  {
        if(props.ready === true){
            

            fetch('api/Quotes')
                .then(res => res.json())
                .then(res => {
                    try {
                        const num = Math.floor(Math.random() * res.length) + 1;
                        setText(res[num].quote1);
                        setAuthor(res[num].author);
                        props.quotefunction(res[num].quote1);
                        props.quoteidfunction(res[num].quoteId);
                        setDone(false);
                    }
                    catch (e) {
                        setText("error");
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