import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

function addToDoHandler(event) {
    event.preventDefault();

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
            <form
                className='add-to-do'
                onSubmit={addToDoHandler.bind(this)}
            >
                <input
                    onChange={changeDescriptionHandler.bind(this)}
                    placeholder='Enter a To Do'
                    type='text'
                    value={this.state.description}
                />
                <button
                    type='submit'
                >
                    { 'Add' }
                </button>
            </form>
        );
    }
}

AddToDo.propTypes = {
    onAddToDo: PropTypes.func.isRequired
};
