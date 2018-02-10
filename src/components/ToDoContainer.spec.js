import React from 'react';
import { shallow } from 'enzyme';

import { ToDoContainer } from './ToDoContainer';

import { AddToDo } from './AddToDo';
import { ToDoList } from './ToDoList';

describe('<ToDoContainer/>', () => {
    let component;

    function renderComponent() {
        component = shallow(<ToDoContainer/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should have a container element', () => {
        expect(component.type()).toEqual('main');
        expect(component.hasClass('to-do-container')).toEqual(true);
    });

    it('should have a component to add to do items', () => {
        const addToDo = component.find(AddToDo);

        expect(addToDo.length).toEqual(1);
    });

    it('should have a list of to dos with an empty list by default', () => {
        const list = component.find(ToDoList);

        expect(list.props().list).toEqual([]);
    });

    describe('when a to do is added', () => {
        it('should update the to do list', () => {
            renderComponent();

            const add = component.find(AddToDo);
            const description = 'some description';

            add.props().onAddToDo(description);

            component.update();

            const list = component.find(ToDoList);
            const firstListItem = list.props().list[0];

            expect(firstListItem.description).toEqual(description);
        });
    });
});
