import Chance from 'chance';

const chance = new Chance();

export function getToDoMock(overrides) {
    return {
        description: chance.word(),
        id: chance.hash(),
        isDone: chance.bool(),
        ...overrides
    };
}
