let knightPosition = [1, 7];
let observer = null;

function observe(callbackFn) {
    if (observer) {
        throw new Error('Multiple observers not allowed!');
    }

    // set the observer - React.render(knightPosition)
    observer = callbackFn;
    emitChange();
}

function moveKnight(toX, toY) {
    knightPosition = [toX, toY];
    emitChange();
}

function canMoveKnight(toX, toY) {
    if (!insideBounds(toX, toY)) return false;

    const [currX, currY] = knightPosition;
    const diffX = Math.abs(toX - currX);
    const diffY = Math.abs(toY - currY);

    return ((diffX == 1 && diffY == 2) || (diffX == 2 && diffY == 1));
}

// ===== PRIVATE functions ===== 

function insideBounds(x, y) {
    return (x >= 0 && x < 8 && y >= 0 && y < 8);
}

function emitChange() {
    observer(knightPosition); // send the new knightPosition
}

export default {
    observe,
    moveKnight,
    canMoveKnight
};
