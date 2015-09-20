import React from 'react';
import Board from './components/Board';

import { observe } from './state/Game'; 

const rootEl = document.getElementById('root');

// observe some function that emits a stream of values
observe(knightPosition => {
    React.render(
        <Board knightPosition={knightPosition} />,
        rootEl
    );
});

