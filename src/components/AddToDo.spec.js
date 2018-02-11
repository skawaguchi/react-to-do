import React from 'react';
import { mount, shallow } from 'enzyme';
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

    function renderMountedComponent(overrides) {
        props = {
            description: 'some value',
            onAddToDo: sandbox.stub(),
            ...overrides
        };

        component = mount(<AddToDo {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component renders', () => {
        it('should have a container element', () => {
            expect(component.type()).toEqual('form');
            expect(component.hasClass('add-to-do')).toEqual(true);
        });

        it('should have an input', () => {
            const input = component.find('input');

            expect(input.type()).toEqual('input');
            expect(input.props().type).toEqual('text');
            expect(input.props().placeholder).toEqual('Enter a To Do');
        });

        it('should have a button', () => {
            const button = component.find('button');

            expect(button.type()).toEqual('button');
            expect(button.props().type).toEqual('submit');
            expect(button.text()).toEqual('Add');
        });
    });

    describe('Given the description is not blank', () => {
        describe('when the button is clicked', () => {
            it('should add a new to do and reset the add to do input', () => {
                renderMountedComponent();

                const changeEvent = {
                    target: {
                        value: 'some other value'
                    }
                };
                const submitEvent = {
                    preventDefault: sandbox.stub()
                };

                let input = component.find('input');
                const button = component.find('button');

                input.simulate('change', changeEvent);

                button.simulate('submit', submitEvent);

                input = component.find('input');

                sinon.assert.calledWithExactly(props.onAddToDo, changeEvent.target.value);
                sinon.assert.calledOnce(submitEvent.preventDefault);

                expect(input.props().value).toEqual('');
            });
        });
    });

    describe('Given the description is blank', () => {
        describe('when the button is clicked', () => {
            it('should not add a new to do', () => {
                renderMountedComponent();

                const changeEvent = {
                    target: {
                        value: ''
                    }
                };
                const submitEvent = {
                    preventDefault: sandbox.stub()
                };

                let input = component.find('input');
                const button = component.find('button');

                input.simulate('change', changeEvent);

                button.simulate('submit', submitEvent);

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
