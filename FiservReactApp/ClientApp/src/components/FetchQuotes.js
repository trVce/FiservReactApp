import React, { useState, useEffect } from 'react';
import FetchScores from './FetchScores'
const FetchQoutes = (props) => {
    const [quotes, setQuotes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showScores, setShowScores] = useState(false);
    const [scoresTable, setScoresTable] = useState(null);

    useEffect(() => {
        const response = fetch('api/Scores')

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
    }, []);

    function findScores(id) {
        setScoresTable(<FetchScores quoteId={id} />);
        setShowScores(true);
        setLoading(true);
    }

    function showTable() {
        setShowScores(false);
        setLoading(false);
    }

    function renderscoresTable(quotes) {
        if (quotes != null && quotes != undefined) {
            return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Author</th>
                            <th>Quote</th>
                            <th>Scores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.map(quote =>
                            <tr key={quote.quoteId}>
                                <td>{quote.quoteId}</td>
                                <td>{quote.author}</td>
                                <td>{quote.quote1}</td>
                                <td><button class="btn btn-primary" onClick={() => findScores(quote.quoteId)}>Scores</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
        } else {
            return (<p><em>Loading...</em></p>)
        }

    }
    return (
        test()
    );
};
export default FetchQoutes;