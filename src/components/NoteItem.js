import React from 'react'
import {deleteNotebook} from '../actions/index'
import { connect } from 'react-redux'

const NoteItem = (props) => {

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.text}</p>
                    <i className="fa fa-trash-alt mx-2" onClick={()=>{props.deleteNotebook(props.note.id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{props.updateNote(props.note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {deleteNotebook})(NoteItem)
