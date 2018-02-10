import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { AddToDo } from './AddToDo';

const sandbox = sinon.sandbox.create();

describe('<AddToDo/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = {
            description: 'some value',
            onAddToDo: sandbox.stub(),
            ...overrides
        };

        component = shallow(<AddToDo {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component renders', () => {
        it('should have a container element', () => {
            expect(component.type()).toEqual('div');
            expect(component.hasClass('add-to-do')).toEqual(true);
        });

        it('should have an input', () => {
            const input = component.find('input');

            expect(input.type()).toEqual('input');
            expect(input.props().type).toEqual('text');
            expect(input.props().placeholder).toEqual('Enter a task description');
        });

        it('should have a button', () => {
            const button = component.find('button');

            expect(button.type()).toEqual('button');
            expect(button.text()).toEqual('Add a To Do');
        });
    });

    describe('Given the description is not blank', () => {
        describe('when the button is clicked', () => {
            it('should add a new to do and reset the add to do input', () => {
                renderComponent();

                const event = {
                    target: {
                        value: 'some other value'
                    }
                };

                let input = component.find('input');
                const button = component.find('button');

                input.simulate('change', event);

                button.simulate('click');

                input = component.find('input');

                sinon.assert.calledWithExactly(props.onAddToDo, event.target.value);
                expect(input.props().value).toEqual('');
            });
        });
    });

    describe('Given the description is blank', () => {
        describe('when the button is clicked', () => {
            it('should not add a new to do', () => {
                renderComponent({
                    description: ''
                });

                const button = component.find('button');

                button.simulate('click');

                sinon.assert.notCalled(props.onAddToDo);
            });
        });
    });

    describe('when the input is changed', () => {
        it('should update the input', () => {
            renderComponent();

            const event = {
                target: {
                    value: 'some other value'
                }
            };

            component.simulate('change', event);

        });
    });
});
