import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Question({ level, setLevel, email }) {

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('');

  useEffect(() => {

    axios.post("http://localhost:8000/hunt/", {
      "id": level
    }).then(res => {
      setQuestion(res.data.question);
    }).catch(err => console.error(err))

  }, [level])


  const verifyAnswer = async (level, email, answer) => {
    axios.post("http://localhost:8000/hunt/submit/", {
      "id": level,
      "email": email,
      "answer": answer
    }
    ).then(res => {
      if (res.data.isCorrect) {
        if (level >= 0 && level < 3)
          setLevel(level + 1);
      }
      else
        alert("Your answer is incorrect. Please try again.");

    }).catch((err) => console.error(err))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    verifyAnswer(level, email, answer);
  }


  return (
    <div className="home">
      <div className="main">
        <div className="heading question-label">Level <span className="accent">{level}</span></div>
        <div className="question">
          {question}
        </div>
        <form className="form-group" onSubmit={submitHandler}>
          <input className="question-input" type="text" onChange={(e) => setAnswer(e.target.value)} />
          <div className="big-button">
            <button type="submit" onClick={submitHandler}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
