import { useState } from 'react';

export default function Question() {

  let req = {
    "question": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam ducimus explicabo nostrum cupiditate voluptatem consequatur vero libero totam aperiam provident? Ex sequi illo natus harum magnam expedita eaque eum reprehenderit. Tenetur doloremque maiores laborum corrupti omnis similique praesentium excepturi quidem.",
    "answers": ["Red", "red", "RED"]
  }

  const [answer, setAnswer] = useState('');

  const answerVerifyingHnadler = () => {
    if (!req.answers.some((e) => {
      return e === answer;
    })) {
      alert("Your answer is incorrect. Please try again.");
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    answerVerifyingHnadler();
    // Update to server.
  }


  return (
    <div className="home">
      <div className="main">
        <div className="heading question-label">Level <span className="accent">0</span></div>
        <div className="question">
          {req.question}
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
