import React, { PropTypes } from 'react';
import Square from './Square';
import Radium, { Style } from 'radium';
import styles from '../styles/square';
// API
import { canMoveKnight, moveKnight } from '../state/Game';
import { ItemTypes } from '../state/Constants';
import { DropTarget } from 'react-dnd';

/**
Smart Square knows position [x, y].
- renders Square with color.
**/
@Radium
class SquareContainer extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  render() {
    const { x, y, connectDropTarget, isOver, canDrop } = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={[ styles.dropTarget ]}>
        <Square black={black}>
          { this.props.children }
        </Square>
        { isOver && !canDrop && this.renderOverlay('red') }
        { !isOver && canDrop && this.renderOverlay('yellow') }
        { isOver && canDrop && this.renderOverlay('green') }
      </div>
    );
  }

  renderOverlay(color) {
    return (
      <div style={[ styles.isOver, styles[color] ]} />
    );
  }
}

// Drop target specification
const squareTarget = {
  drop (props, monitor) {
    // use monitor.getItem() to retrieve the dragged item that the drag source returned from beginDrag
    moveKnight(props.x, props.y);
  },
  canDrop (props) {
    return canMoveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  // send into props
  return {
    connectDropTarget: connect.dropTarget(), // fn to connect drop target node
    isOver: monitor.isOver(), // whether pointer is over the SquareContainer
    canDrop: monitor.canDrop(),
  };
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(SquareContainer);
