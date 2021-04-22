import React from 'react'

const Chicago = ({ chicago }) => {

    var arr = [];
    Object.keys(chicago).forEach(function(key) {
        arr.push(chicago[key]);
    });

    return (
        <div>
            <ul>
                {arr.map(item => <li>{JSON.stringify(item)}</li>)}
            </ul>
        </div>
    )
}

export default Chicago;