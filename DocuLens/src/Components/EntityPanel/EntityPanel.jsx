import { useState } from 'react'
import './EntityPanel.css'



function EntityPanel({namedEntities, questions}) {
  const [showQuestion, setShowQuestion] = useState(false)
  const [currQuestion, setCurrQuestion] = useState({question: '', number: 0})

  function setQuestion(question , i) {
    setShowQuestion(true)
    setCurrQuestion({question: question, number: i})
  }

  function handleExit() {
    setShowQuestion(false)
    setCurrQuestion({question: '', number: 0})
  }

  return (
    <>
      <QuestionModal
        show={showQuestion}
        onExit={handleExit}
        title={'Question ' + currQuestion.number}
        message={currQuestion.question}
      />
      <div className='flex card-bg flex-col border-2 rounded p-5'>
        <div className='flex flex-col'>
          <p className='headers border-b-1 pb-2'>Mentioned:</p>
          <div className='flex flex-row mt-2'>
            <div className='max-w-30 mx-2'><p className='headers'>People: </p>
              {namedEntities.people.map((person, i) => (
                <p title={person} className='whitespace-nowrap overflow-hidden text-ellipsis' key={i}>{person}</p>
              ))}
            </div>
            <div className='max-w-30 mx-2'><p className='headers'>Orgnizations:</p>
            {namedEntities.organizations.map((org, i) => (
              <p title={org} className='whitespace-nowrap overflow-hidden text-ellipsis' key={i}>{org}</p>
            ))}
            </div>
            <div className='max-w-30 mx-2'><p className='headers'>Dates: </p>
            {namedEntities.dates.map((date, i) => (
              <p title={date} className='whitespace-nowrap overflow-hidden text-ellipsis' key={i}>{date}</p>
            ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='headers my-2'>Questions Generated:</p>
          {questions.map((question, i) => (
            <button key={i} onClick={() => setQuestion(question, i+1)}>Show Question {i+1}</button>
          ))}
        </div>
      </div>
    </>
  )
}

function QuestionModal({show, title, onExit, message}) {
  if (!show) {
    return null; // Don't render if not visible
  }

  return (
    <div className="modal-overlay"> {/* Styling for overlay */}
      <div className="modal-content"> {/* Styling for modal box */}
        <h3 className='font-bold font-m:'>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onExit}>Exit</button>
        </div>
      </div>
    </div>
  );
}

export default EntityPanel