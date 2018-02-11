import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import uniqid from 'uniqid';

import { AddToDo } from './AddToDo';
import { ToDoList } from './ToDoList';

function onAddToDo(description) {
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

function onDescriptionChange(id, event) {
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

function onDoneChange(id) {
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

function onRemove(id) {
    const newList = this.state.list.filter((item) => {
        if (item.id !== id) {
            return item;
        }
    });

    this.setState({
        list: newList
    });
}

export class ToDoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: props.list || []
        };
    }

    render() {
        return (
            <main className='to-do-container'>
                <AddToDo
                    onAddToDo={onAddToDo.bind(this)}
                />
                <ToDoList
                    list={this.state.list}
                    onDescriptionChange={onDescriptionChange.bind(this)}
                    onDoneChange={onDoneChange.bind(this)}
                    onRemove={onRemove.bind(this)}
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
