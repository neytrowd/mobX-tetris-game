export const shapes = {
    0: {
        color: '255,255,255',
        shape: [[0]]
    },

    shapeI: {
        color: '95,234,202',
        shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ]
    },

    shapeJ: {
        color: '3,100,251',
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    },

    shapeL: {
        color: '255,152,27',
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ]
    },

    shapeS: {
        color: '97,226,62',
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ]
    },

    shapeT: {
        color: '204,122,252',
        shape: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    },

    shapeZ: {
        color: '255,72,98',
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]
    },

    shapeO: {
        color: '0,10,255',
        shape: [
            [1, 1],
            [1, 1]
        ]
    }
}

export const randomShape = () => {
    let keys = Object.keys(shapes).filter(key => key !== '0');
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    return shapes[randomKey];
}