const makeMove = require('./enemy')


test('idk make move or something', () => {
    const data = makeMove()
    expect(data[0]).toBeGreaterThanOrEqual(0)
    expect(data[0]).toBeLessThanOrEqual(BOARD_SIZE-1)
    expect(data[1]).toBeGreaterThanOrEqual(0)
    expect(data[1]).toBeLessThanOrEqual(BOARD_SIZE-1)
});


test('collision test', () => {
    let guessed = []
    for (i = 0; i < 99; ++i) {
        guessed.push(makeMove())
    }
    dup = new Set(guessed)
    expect(dup.size).toBe(99)
});

