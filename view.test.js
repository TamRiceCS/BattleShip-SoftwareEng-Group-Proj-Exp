const createVirtualBoard = require('./view.js')

test('Testing player one board', () => {
    createVirtualBoard()
    expect(virtual_player[0][0]).toBe("--")
});

test('Testing player one board', () => {
    createVirtualBoard()
    expect(virtual_player_two[0][0]).toBe("--")
});

test('Testing enemy board', () => {
    createVirtualBoard()
    expect(virtual_enemy[0][0]).toBe("---")
});

test('Testing player one board', () => {
    createVirtualBoard()
    expect(virtual_player[BOARD_SIZE-1][BOARD_SIZE-1]).toBe("--")
});

test('Testing player one board', () => {
    createVirtualBoard()
    expect(virtual_player_two[BOARD_SIZE-1][BOARD_SIZE-1]).toBe("--")
});

test('Testing enemy board', () => {
    createVirtualBoard()
    expect(virtual_enemy[BOARD_SIZE-1][BOARD_SIZE-1]).toBe("---")
});