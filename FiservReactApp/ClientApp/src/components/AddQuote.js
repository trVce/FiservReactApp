import React, { useState, useEffect } from 'react';
const AddQuote = (props) => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [created, setCreated] = useState(false);

    function createQuote() {
        let newQuote = { author: author, quote1: quote}
        const options = {
            method: 'POST',
            body: JSON.stringify(newQuote),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('api/Quotes', options)
        setCreated(true);
    }
    function setCreatedFalse(event) {
        setCreated(false);
    }

    function handleQuoteForum(event) {
        setQuote(event.target.value);
    }

    function handleAuthorForum(event) {
        setAuthor(event.target.value);
    }

    return (
        
        <div>
            {created ?
                <div>
                    <h2>author</h2>
                    <p>quote</p>
                    <button className="btn btn-primary" name="back" onClick={setCreatedFalse}>Back</button>
                </div>
                :
                <div>
                    <label>
                        Author
                    </label>
                    <input class="form-control col-lg-8" name="author"
                        type="text" onChange={handleAuthorForum} />
                    <label>
                        Quote
                    </label>
                    <input class="form-control col-lg-8" name="quote"
                        type="text" onChange={handleQuoteForum} />
                    <button className="btn btn-primary" name="add" onClick={createQuote}>submit</button>
                </div>
            }
        </div>

    );
}
export default AddQuote;
