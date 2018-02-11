import React from 'react';
import { PropTypes } from 'prop-types';

import { ToDoItem } from './ToDoItem';

export function ToDoList(props) {
    return (
        <ul className='to-do-list'>
            {
                props.list.map((item) => {
                    return (
                        <ToDoItem
                            description={item.description}
                            id={item.id}
                            isDone={item.isDone}
                            key={item.id}
                            onDescriptionChange={props.onDescriptionChange}
                            onDoneChange={props.onDoneChange}
                            onRemove={props.onRemove}
                        />
                    );
                })
            }
        </ul>
    );
}

ToDoList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            isDone: PropTypes.bool.isRequired
        })
    ),
    onDescriptionChange: PropTypes.func.isRequired,
    onDoneChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};
