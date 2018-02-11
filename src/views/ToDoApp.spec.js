import React from 'react';
import { shallow } from 'enzyme';

import { ToDoApp } from './ToDoApp';

import { ToDoContainer } from '../components/ToDoContainer';

describe('<ToDoApp/>', () => {
    let component;

    function renderComponent() {
        component = shallow(<ToDoApp/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should have a container for the app with a identifying class name', () => {
        expect(component.type()).toEqual('div');
        expect(component.hasClass('to-do-app')).toEqual(true);
    });

    it('should have a to do list container', () => {
        const todo = component.find(ToDoContainer);

        expect(todo.length).toEqual(1);
    });
});

