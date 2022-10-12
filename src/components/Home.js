import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'

const Home = (props) => {
  return (
    <>
      <AddNote />
      <Notes />
    </>
  )
}

export default Home