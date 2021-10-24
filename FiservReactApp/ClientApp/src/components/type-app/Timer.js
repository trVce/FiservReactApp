import React, { useState, useEffect } from 'react';

const Timer = (props) => {
    const [seconds, setSeconds] = useState(0);
   
    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            props.timeFunction(seconds);
        }, 1000);
        
        return () => clearInterval(interval);
    }, [seconds, props]);

    return (
        <div>
        </div>
    );
};

export default Timer;