import React from 'react';

import { ToDoContainer } from '../components/ToDoContainer';

export function ToDoApp() {
    return (
        <div className='to-do-app'>
            <h1>{'To Do List'}</h1>
            <ToDoContainer/>
        </div>
    );
}
