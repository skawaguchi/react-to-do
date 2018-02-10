import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

function addToDoHandler() {
    if (this.state.description) {
        this.props.onAddToDo(this.state.description);
        this.setState({
            description: ''
        });
    }
}

function changeDescriptionHandler(event) {
    this.setState({
        description: event.target.value
    });
}

export class AddToDo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: ''
        };
    }

    render() {
        return (
            <div className='add-to-do'>
                <input
                    onChange={changeDescriptionHandler.bind(this)}
                    placeholder='Enter a task description'
                    type='text'
                    value={this.state.description}
                />
                <button
                    onClick={addToDoHandler.bind(this)}
                >
                    { 'Add a To Do' }
                </button>
            </div>
        );
    }
}

AddToDo.propTypes = {
    onAddToDo: PropTypes.func.isRequired
};
