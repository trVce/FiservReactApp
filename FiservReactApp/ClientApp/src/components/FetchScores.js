import React, { useState, useEffect } from 'react';

const FetchScores = (props) => {
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myVar, setMyVar] = useState(true);
    const [listCount] = useState(props.listCount);
    const [quoteId] = useState(props.quoteId);
    
    useEffect(() => {
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
    }, [myVar]);

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


    function deleteScore(id) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('api/Scores/' + id, options);
        setLoading(true);
        setMyVar(!myVar);
        
    }

    function renderscoresTable(scores) {
        if (scores != null && scores != undefined) {
            return (
                <div>
                    <h3> Scores </h3>
                    <table className='table table-striped border' aria-labelledby="tabelLabel">
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
                                    <td><button class="btn btn-primary" onClick={() => deleteScore(score.scoreId)}>Delete</button></td>
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