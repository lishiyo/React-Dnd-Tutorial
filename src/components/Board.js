import React, { PropTypes } from 'react';
// subcomponents
import SquareContainer from './SquareContainer';
import Knight from './Knight';
// styles
import Radium from 'radium';
import styles from '../styles/board';
// API
import { canMoveKnight, moveKnight } from '../state/Game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@Radium
class Board extends React.Component {
    static propTypes = {
        knightPosition: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i)); // [<Square />, <Square />]
        }

        return (
            <div style={[
                styles.grid
            ]}>
                { squares }
            </div>
        );
    }

    renderSquare(i) { // i = 0..63
        // [0, 0],[1, 0]...[0, 1],[1,1]...[7,7]
        const x = i % 8; 
        const y = Math.floor(i / 8); // 0..7

        // [1,0], [0,1] squares will be black
        const black = (x + y) % 2 == 1;

        return (
            <div key={i} 
                style={[ styles.block ]} >
                <SquareContainer x={x} y={y}>
                    { this.renderPiece(x, y) }
                </SquareContainer>
            </div>
        );
    }

    handleSquareClick(toX, toY) {
        if (canMoveKnight(toX, toY)) {
            moveKnight(toX, toY);   
        } else {
            console.log('can\'t move there!');
        }
    }

    renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        return (knightX == x && knightY == y) ? <Knight /> : null; 
    }
}

export default DragDropContext(HTML5Backend)(Board);
