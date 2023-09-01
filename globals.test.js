const globals = require("./globals.js")

test('getBoardID P', () => {
    expect(globals.getBoardID("P,3,5")).toBe("P")
});

test('getBoardID P1', () => {
    expect(globals.getBoardID("P1,3,5")).toBe("P1")
});

test('getBoardID P2', () => {
    expect(globals.getBoardID("P2,3,5")).toBe("P2")
});

test('getBoardID E', () => {
    expect(globals.getBoardID("E,3,5")).toBe("E")
});

test('getRow', () => {
    expect(globals.getRow("P1,3,5")).toBe(3)
});

test('getCol', () => {
    expect(globals.getCol("P1,3,5")).toBe(5)
});

test('validCoordinates', () => {
    var cell = { id: "P,3,5" };
    expect(globals.validCoordinates(cell)).toBe(true)
});

test('validCoordinates false', () => {
    var cell = { id: "P,20,5" };
    expect(globals.validCoordinates(cell)).toBe(false)
});

test('validCoordinates false', () => {
    var cell = { id: "P,3,-99" };
    expect(globals.validCoordinates(cell)).toBe(false)
});

test('IDToString', () => {
    expect(globals.IDToString("P1", 3, 5)).toBe("P1,3,5")
});