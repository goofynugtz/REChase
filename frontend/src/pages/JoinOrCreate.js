import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
export function CreateTeam({ email, isTeamed, setIsTeamed }) {

  const [teamName, setTeamName] = useState('')
  const createTeam = async (teamName, email) => {
    axios.post("http://localhost:8000/create-team/", {
      "teamName": teamName,
      "email": email,
    }
    ).then(res => {
      console.log(res)
      if (res.status === 201)
        setIsTeamed(true)
    }).catch((err) => console.error(err))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    createTeam(teamName, email);
  }

  return (
    <>
      {isTeamed ?
        <Navigate to="/" />
        :
        <div className='home'>
          <form className="form-group main center" onSubmit={submitHandler}>
            <div className='help-text accent big'>
              Enter Team Name
            </div>
            <input className="form-input" placeholder='CaffieneOverflow maybe?' type="text" onChange={(e) => setTeamName(e.target.value)} />
            <button className="medium-button" type="submit" onClick={submitHandler}>Submit</button>
          </form>
        </div>
      }
    </>
  )
}

export function JoinTeam({ email, isTeamed, setIsTeamed }) {

  const [teamCode, setTeamCode] = useState('')

  const joinTeam = async (teamCode, email) => {
    axios.post("http://localhost:8000/join-team/", {
      "teamCode": teamCode,
      "email": email,
    }
    ).then(res => {
      console.log(res)
      if (res.status === 202)
        setIsTeamed(true)
    }).catch((err) => console.error(err))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    joinTeam(teamCode, email);
  }

  return (
    <>
      {
        isTeamed ?
          <Navigate to="/" />
          :
          <div className='home'>
            <form className="form-group main center" onSubmit={submitHandler}>
              <div className='help-text accent big'>
                Enter Six digit team Code
              </div>
              <input className="form-input" placeholder='Eg: A4FY4W' type="text" onChange={(e) => setTeamCode(e.target.value)} />
              <button className="medium-button" type="submit" onClick={submitHandler}>Submit</button>
            </form>
          </div>
      }
    </>
  )
}

