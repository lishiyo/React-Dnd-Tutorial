import React, { PropTypes } from 'react';
import Radium from 'radium';
import { ItemTypes } from '../state/Constants';
import { DragSource } from 'react-dnd';
import styles from '../styles/knight';

@Radium
class Knight extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    // grab props
    const { connectDragSource, isDragging } = this.props;

    // pass in div to connect.dragSource();
    return connectDragSource(
      <div style={[ styles.base, isDragging && styles.isDragging ]}>
        ♘
      </div>
    );
  }

  componentDidMount() {
    const img = new Image(30, 30);
    img.src = 'public/images/nibble.png';
    img.onload = () => this.props.connectDragPreview(img);
  }
}

// specification
const knightSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  // props for the Knight
  return {
    connectDragSource: connect.dragSource(), // function to connect drag source node
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(), // whether pointer is being dragged
  }
}

// The DragSource higher-order component accepts three parameters: type, spec, and collect
export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
