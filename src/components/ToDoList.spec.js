import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';
import sinon from 'sinon';

import { ToDoList } from './ToDoList';

import { ToDoItem } from './ToDoItem';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

function mockToDo(overrides) {
    return {
        description: chance.word(),
        id: chance.hash(),
        isDone: chance.bool(),
        ...overrides
    };
}

describe('<ToDoList/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = {
            list: [
                mockToDo(),
                mockToDo(),
                mockToDo()
            ],
            onDescriptionChange: sandbox.stub(),
            onDoneChange: sandbox.stub(),
            ...overrides
        };

        component = shallow(<ToDoList {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should have a container element', () => {
        expect(component.type()).toEqual('ul');
        expect(component.hasClass('to-do-list')).toEqual(true);
    });

    it('should have a list of to do items', () => {
        const children = component.find(ToDoItem);

        expect(children.length).toEqual(3);

        children.forEach((child, index) => {
            const item = props.list[index];

            expect(child.props().description).toEqual(item.description);
            expect(child.props().isDone).toEqual(item.isDone);
            expect(child.props().onDescriptionChange).toEqual(props.onDescriptionChange);
            expect(child.props().onDoneChange).toEqual(props.onDoneChange);
        });
    });
});
