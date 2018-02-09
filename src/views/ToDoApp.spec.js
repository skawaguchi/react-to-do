import React from 'react';
import { shallow } from 'enzyme';

import { ToDoApp } from './ToDoApp';

describe('<HistoryStoreProvider/>', () => {
    let component;

    function renderComponent() {
        component = shallow(<ToDoApp/>);
    }

    beforeEach(() => {
        renderComponent(<ToDoApp/>);
    });

    it('should have a container with a identifying class name', () => {
        expect(component.type()).toEqual('div');
        expect(component.hasClass('to-do-app')).toEqual(true);
    });
});

