import * as types from '../actions/actionTypes';

const red = (state = [], action) => {
    switch (action.type) {
        case types.REQUEST_NOTEBOOKS:
            return action.notebooks
        case types.ADD_NOTEBOOK:
            return [...state, action.notebook]
        case types.UPDATE_NOTEBOOK:
            return state.map(notebook => notebook.id === action.notebook.id ? action.notebook : notebook)
        case types.DELETE_NOTEBOOK:
            const notebooks = state.filter(notebook => notebook.id !== action.notebookId)
            return notebooks
        default:
            return state
    }
}

export default red;