import React from 'react';
import { shallow } from 'enzyme';

import { ToDoContainer } from './ToDoContainer';

import { AddToDo } from './AddToDo';
import { ToDoList } from './ToDoList';

import { getToDoMock } from '../mock-utils';

describe('<ToDoContainer/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = {
            ...overrides
        };

        component = shallow(<ToDoContainer {...props}/>);
    }

    describe('Given the component renders', () => {
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
    });

    describe('Given a list', () => {
        it('should set the list', () => {
            renderComponent({
                list: [
                    getToDoMock(),
                    getToDoMock(),
                    getToDoMock()
                ]
            });

            const list = component.find(ToDoList);

            expect(list.props().list).toEqual(props.list);
        });
    });

    describe('Given no list', () => {
        it('should have a list of to dos with an empty list by default', () => {
            renderComponent({
                list: undefined
            });

            const list = component.find(ToDoList);

            expect(list.props().list).toEqual([]);
        });
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

    describe('when a to do description is changed', () => {
        it('should update the to do description', () => {
            renderComponent({
                list: [
                    getToDoMock()
                ]
            });

            const listComponent = component.find(ToDoList);
            const listData = listComponent.props().list;

            const itemId = listData[0].id;

            const description = 'some updated description';

            const event = {
                target: {
                    value: description
                }
            };

            listComponent.props().onDescriptionChange(itemId, event);

            component.update();

            const list = component.find(ToDoList);
            const firstListItem = list.props().list[0];

            expect(firstListItem.description).toEqual(description);
        });
    });

    describe('when a to do is marked done', () => {
        it('should show the to do as checked', () => {
            renderComponent({
                list: [
                    getToDoMock({
                        isDone: true
                    })
                ]
            });

            const listComponent = component.find(ToDoList);
            const listData = listComponent.props().list;

            const firstItemId = listData[0].id;

            listComponent.props().onDoneChange(firstItemId);

            component.update();

            const list = component.find(ToDoList);
            const firstListItem = list.props().list[0];

            expect(firstListItem.isDone).toEqual(false);
        });
    });

    describe('when a to do is removed', () => {
        it('should remove the to do', () => {
            renderComponent({
                list: [
                    getToDoMock()
                ]
            });

            const listComponent = component.find(ToDoList);
            let listData = listComponent.props().list;

            const firstItemId = listData[0].id;

            listComponent.props().onRemove(firstItemId);

            component.update();

            const newListData = component.find(ToDoList).props().list;

            expect(newListData.length).toEqual(0);
        });
    });
});
