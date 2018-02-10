import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';
import sinon from 'sinon';

import { ToDoItem } from './ToDoItem';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

describe('<ToDoItem/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = {
            description: 'some label',
            isDone: chance.bool(),
            onDescriptionChange: sandbox.stub(),
            onDoneChange: sandbox.stub(),
            ...overrides
        };

        component = shallow(<ToDoItem {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should have a container with a identifying class name', () => {
        expect(component.type()).toEqual('div');
        expect(component.hasClass('to-do-item')).toEqual(true);
    });

    it('should have text describing the to do', () => {
        const checkbox = component.find('input.checkbox');

        expect(checkbox.props().type).toEqual('checkbox');
        expect(checkbox.props().value).toEqual(props.isDone);
    });

    it('should have a text description', () => {
        const text = component.find('input.description');

        expect(text.props().type).toEqual('text');
        expect(text.props().value).toEqual(props.description);
    });

    describe('when the checkbox is selected', () => {
        it('should call the done change handler', () => {
            const checkbox = component.find('input.checkbox');

            const event = {};

            checkbox.simulate('change', event);

            sinon.assert.calledWithExactly(props.onDoneChange, event);
        });
    });

    describe('when the descriptions is changed', () => {
        it('should call the description change handler', () => {
            const text = component.find('input.description');

            const event = {};

            text.simulate('change', event);

            sinon.assert.calledWithExactly(props.onDescriptionChange, event);
        });
    });
});

