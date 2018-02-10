import React from 'react';
import { PropTypes } from 'prop-types';

export function ToDoItem(props) {
    return (
        <div className='to-do-item'>
            <input
                className='checkbox'
                onChange={props.onDoneChange}
                type='checkbox'
                value={props.isDone}
            />
            <input
                className='description'
                onChange={props.onDescriptionChange}
                type='text'
                value={props.description}
            />
        </div>
    );
}

ToDoItem.propTypes = {
    description: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onDoneChange: PropTypes.func.isRequired
};
