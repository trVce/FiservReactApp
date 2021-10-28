import React, { useState, useEffect } from 'react';
import FetchScores from './FetchScores'
const FetchQoutes = (props) => {
    const [quotes, setQuotes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showScores, setShowScores] = useState(false);
    const [scoresTable, setScoresTable] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [author, setAuthor] = useState();
    const [text, setText] = useState();
    const [updated, setUpdated] = useState(false);
    
    useEffect(() => {
        fetch('api/Quotes')
            .then(res => res.json())
            .then(res => {
                try {
                    setQuotes(res);
                    setLoading(false);
                }
                catch (e) {

                }
            });
    }, [updated]);

    
    function editQuote() {

        let editedQuote = {quoteId: editId, author: author, quote1: text}
        const options = {
            method: 'PUT',
            body: JSON.stringify(editedQuote),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('api/Quotes/' + editId, options);
        setUpdated(!updated);
    }
    
    function findScores(id) {
        setScoresTable(<FetchScores quoteId={id} />);
        setShowScores(true);
        setLoading(true);
    }

    function callEditQuote(quoteObj) {
        setEditId(quoteObj.quoteId);
        setAuthor(quoteObj.author);
        setText(quoteObj.quote1)
        setShowEdit(true);
        setLoading(true);
    }

    function showTable() {
        setShowEdit(false);
        setShowScores(false);
        setLoading(false);
    }

    function handleAuthorForum(event) {
        setAuthor(event.target.value);
    }

    function handleTextForum(event) {
        setText(event.target.value);
    }

    function renderscoresTable(quotes) {
      
        if (quotes !== null && quotes !== undefined) {
            return (
                <div>
                    <h3> Quotes </h3>
                    <table className='table table-striped border' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Author</th>
                                <th>Quote</th>
                                <th>Scores</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map(quote =>
                                <tr key={quote.quoteId}>
                                    <td>{quote.quoteId}</td>
                                    <td>{quote.author}</td>
                                    <td>{quote.quote1}</td>
                                    <td><button class="btn btn-primary"  onClick={() => findScores(quote.quoteId)}>Scores</button></td>
                                    <td><button class="btn btn-primary"  onClick={() => callEditQuote(quote)}>Edit</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return
        }
    }
    function test() {

        if (!loading) {
            return renderscoresTable(quotes)
        } else if (showScores) {
            return (
                <div>
                    {scoresTable}
                    <button class="btn btn-primary" onClick={() => showTable()}>Back</button>
                </div>
            )
        } else if (showEdit) {
            return (
                <div>
                    <label>
                        Author
                    </label>
                    <input class="form-control col-lg-8" name="author"
                        type="text" value={author} onChange={handleAuthorForum} />
                    <label>
                        Quote
                    </label>
                    <input class="form-control col-lg-8" name="quote"
                        type="text" value={text} onChange={handleTextForum} />
                    <button className="btn btn-primary" name="add" onClick={editQuote}>submit</button>

                    <button class="btn btn-primary" onClick={() => showTable()}>Back</button>
                </div>
            )
        } else {
            return (<p><em>Loading...</em></p>)
        }

    }
    return (
        test()
    );
};
export default FetchQoutes;