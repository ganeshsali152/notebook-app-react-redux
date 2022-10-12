import React, { useState } from 'react'
import { connect } from 'react-redux'
import {createNotebook} from '../actions/index'

const AddNote = (props) => {

    const [note, setNote] = useState({title:"",text:""})

    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick = (e) =>{
        e.preventDefault();
        props.createNotebook({title:note.title,text:note.text});
        // setNote({title:"",text:""});
        // props.showAlert("Added Successfully", 'success')
    }

    return (
        <div className='container my-3'>
            <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Description</label>
                    <input type="text" className="form-control" id="text" name="text" value={note.text} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

// export default AddNote

export default connect(null, {createNotebook})(AddNote)
