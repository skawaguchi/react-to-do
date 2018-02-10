import React, { Component } from 'react';
import uniqid from 'uniqid';

import { AddToDo } from './AddToDo';
import { ToDoList } from './ToDoList';

export class ToDoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
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

    }

    onDoneChange(id, event) {

    }

    render() {
        return (
            <main className='to-do-container'>
                <AddToDo
                    onAddToDo={this.onAddToDo.bind(this)}
                />
                <ToDoList
                    list={this.state.list}
                    onDescriptionChange={this.onDescriptionChange}
                    onDoneChange={this.onDoneChange}
                />
            </main>
        );
    }
}
