import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import uniqid from 'uniqid';

import { AddToDo } from './AddToDo';
import { ToDoList } from './ToDoList';

export class ToDoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: props.list || []
        };
    }

    onAddToDo(description) {
        const newToDo = {
            description,
            id: uniqid(),
            isDone: false
        };

        this.setState({
            list: [
                newToDo,
                ...this.state.list
            ]
        });
    }

    onDescriptionChange(id, event) {
        const newDescription = event.target.value;

        const newList = this.state.list.reduce((list, item) => {
            if (item.id === id) {
                list.push({
                    ...item,
                    description: newDescription
                });
            } else {
                list.push(item);
            }

            return list;
        }, []);

        this.setState({
            list: newList
        });
    }

    onDoneChange(id) {
        const newList = this.state.list.reduce((list, item) => {
            if (item.id === id) {
                list.push({
                    ...item,
                    isDone: !item.isDone
                });
            } else {
                list.push(item);
            }

            return list;
        }, []);

        this.setState({
            list: newList
        });
    }

    onRemove(id) {
        const newList = this.state.list.filter((item) => {
            if (item.id !== id) {
                return item;
            }
        });

        this.setState({
            list: newList
        });
    }

    render() {
        return (
            <main className='to-do-container'>
                <AddToDo
                    onAddToDo={this.onAddToDo.bind(this)}
                />
                <ToDoList
                    list={this.state.list}
                    onDescriptionChange={this.onDescriptionChange.bind(this)}
                    onDoneChange={this.onDoneChange.bind(this)}
                    onRemove={this.onRemove.bind(this)}
                />
            </main>
        );
    }
}

ToDoContainer.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            isDone: PropTypes.bool.isRequired
        })
    )
};
