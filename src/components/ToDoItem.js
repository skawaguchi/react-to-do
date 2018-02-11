import React from 'react';
import { PropTypes } from 'prop-types';

function changeHandler(handler, id, event) {
    handler(id, event);
}

export function ToDoItem(props) {
    return (
        <li className='to-do-item'>
            <input
                checked={props.isDone}
                className='checkbox'
                onChange={changeHandler.bind(null, props.onDoneChange, props.id)}
                type='checkbox'
                value={props.isDone}
            />
            <input
                className='description'
                onChange={changeHandler.bind(null, props.onDescriptionChange, props.id)}
                placeholder='Enter a description'
                type='text'
                value={props.description}
            />
            <button
                className='remove'
                onClick={changeHandler.bind(null, props.onRemove, props.id)}
            >
                {'Remove'}
            </button>
        </li>
    );
}

ToDoItem.propTypes = {
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onDoneChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};
