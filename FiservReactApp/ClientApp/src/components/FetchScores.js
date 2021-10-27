import React, { useState, useEffect } from 'react';

const FetchScores = (props) => {
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(true);
    const [listCount] = useState(props.listCount);
    const [quoteId] = useState(props.quoteId);

    useEffect(() => {
        const response = fetch('api/Scores')

        fetch('api/Scores')
            .then(res => res.json())
            .then(res => {
                try {
                    setScores(res);
                    setLoading(false);
                }
                catch (e) {

                }
            });
    }, []);

    useEffect(() => {

        if (scores !== null && scores !== undefined) {
            if (listCount !== undefined && quoteId !== undefined) {
                const filteredScores = scores.filter(score => score.quoteId === quoteId);
                setScores(filteredScores.sort((a, b) => parseFloat(b.wpm) - parseFloat(a.wpm)).slice(0, listCount));
            } else if (listCount === undefined && quoteId === undefined) {
                setScores(scores);
            } else if (listCount === undefined) {
                const filteredScores = scores.filter(score => score.quoteId === quoteId);
                setScores(filteredScores);
            } else {
                setScores(scores.sort((a, b) => parseFloat(b.wpm) - parseFloat(a.wpm)).slice(0, listCount));
            }
        }
    }, [loading]);

    function renderscoresTable(scores) {
        if (scores != null && scores != undefined) {
            return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>WPM</th>
                            <th>Qoute Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map(score =>
                            <tr key={score.scoreId}>
                                <td>{score.username}</td>
                                <td>{score.wpm}</td>
                                <td>{score.quoteId}</td>
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

        if (loading) {
            return (<p><em>Loading...</em></p>)
        } else {
            return renderscoresTable(scores)
        }

    }
    return (
        test()
    );
};
export default FetchScores;