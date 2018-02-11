import React from 'react';
import { PropTypes } from 'prop-types';

function changeHandler(handler, id, event) {
    handler(id, event);
}

export function ToDoItem(props) {
    return (
        <div className='to-do-item'>
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
                type='text'
                value={props.description}
            />
        </div>
    );
}

ToDoItem.propTypes = {
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onDoneChange: PropTypes.func.isRequired
};
