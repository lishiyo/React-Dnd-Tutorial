import React, { PropTypes } from 'react';
import Radium, { Style } from 'radium';
import styles from '../styles/square';

@Radium
class Square extends React.Component {
    static propTypes = {
        black: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        // grab props out of this.props
        const { black } = this.props; 
        const fill = black ? 'black' : 'white';

        return (
            <div style={[
                styles.base,
                styles[fill]
            ]}>
            { this.props.children }
            </div>
        );
    }
}

export default Square;
