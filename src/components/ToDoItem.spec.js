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
            id: 'some id',
            isDone: chance.bool(),
            onDescriptionChange: sandbox.stub(),
            onDoneChange: sandbox.stub(),
            ...overrides
        };

        component = shallow(<ToDoItem {...props}/>);
    }

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component is rendered', () => {
        beforeEach(() => {
            renderComponent();
        });

        it('should have a container with a identifying class name and a placeholder', () => {
            expect(component.type()).toEqual('div');
            expect(component.hasClass('to-do-item')).toEqual(true);
        });

        it('should show the status of the to do', () => {
            const checkbox = component.find('input.checkbox');

            expect(checkbox.props().type).toEqual('checkbox');
            expect(checkbox.props().value).toEqual(props.isDone);
        });

        it('should have a text description', () => {
            const text = component.find('input.description');

            expect(text.props().type).toEqual('text');
            expect(text.props().value).toEqual(props.description);
            expect(text.props().placeholder).toEqual('Enter a description');
        });

        describe('when the checkbox is toggled', () => {
            it('should call the done change handler', () => {
                const checkbox = component.find('input.checkbox');

                const event = {};

                checkbox.simulate('change', event);

                sinon.assert.calledWithExactly(props.onDoneChange, props.id, event);
            });
        });

        describe('when the description is changed', () => {
            it('should call the description change handler', () => {
                const text = component.find('input.description');

                const event = {};

                text.simulate('change', event);

                sinon.assert.calledWithExactly(props.onDescriptionChange, props.id, event);
            });
        });
    });

    describe('Given the checkbox is marked done', () => {
        it('should set checkbox to checked', () => {
            renderComponent({
                isDone: true
            });

            const checkbox = component.find('input.checkbox');

            expect(checkbox.props().checked).toEqual(true);
        });
    });

    describe('Given the checkbox is not marked done', () => {
        it('should set checkbox to be unchecked', () => {
            renderComponent({
                isDone: false
            });

            const checkbox = component.find('input.checkbox');

            expect(checkbox.props().checked).toEqual(false);
        });
    });
});

