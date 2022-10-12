import * as types from './actionTypes'

const setNotebooks = notebooks => {
    return {
        type: types.REQUEST_NOTEBOOKS,
        notebooks
    }
}

const addNotebook = notebook => {
    return {
        type: types.ADD_NOTEBOOK,
        notebook
    }
}

const destroyNotebook = notebookId => {
    return{
        type: types.DELETE_NOTEBOOK,
        notebookId
    }
}

const setNotebook = notebook => {
    return{
        type: types.UPDATE_NOTEBOOK,
        notebook
    }
}

//reducer

const host = "http://127.0.0.1:8000"

export const getNotebooks = () => {
    const token = localStorage.getItem('token')
    return(dispatch) => {      
        fetch(`${host}/notes/`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(notebook => {          
            dispatch(setNotebooks(notebook))
        })
         .catch(error => console.log(error))
    }
}

export const createNotebook = (notebook) => {
    const token = localStorage.getItem('token')
    const {title,text} = notebook;
    return (dispatch) => {  
        fetch(`${host}/notes/`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title:title,text:text})
        })
        .then(response => response.json())
        .then(notebook => {          
            dispatch(addNotebook(notebook))
        })
         .catch(error => console.log(error))
    }
}

export const updateNotebook = (notebook) => {
    const token = localStorage.getItem('token')
    const {id,title,text} = notebook;
    return(dispatch) => {
        fetch(`${host}/notes/${id}`, {
            method: 'PATCH',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title,text})
        })
        .then(response => response.json())
        .then(notebook => {
            dispatch(setNotebook(notebook))
        })
        .catch(error => console.log(error))
    }
}

export const deleteNotebook = (notebookId) => {
    const token = localStorage.getItem('token')
    return(dispatch) => {
        fetch(`${host}/notes/${notebookId}`, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
          dispatch(destroyNotebook(notebookId))
        })
        .catch(error => console.log(error))
    }
}
