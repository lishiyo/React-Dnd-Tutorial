// Board and Square styles

const styles = {
  grid: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '500px',
    maxHeight: '500px',
  },

  block: {
    width: '12.5%',
    height: '12.5%'
  },

  base: {
    background: 'blue',
    border: 0,
    borderRadius: 4,
    color: 'white',
    padding: '1.5em',

    ':hover': {
      backgroundColor: 'red'
    },

    ':focus': {
      backgroundColor: 'green'
    },

    ':active': {
      backgroundColor: 'yellow'
    },
  },
};

export default styles;
