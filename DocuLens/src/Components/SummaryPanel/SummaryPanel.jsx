import { useState } from 'react'
import './SummaryPanel.css'
import SummaryModal from './SummaryModal'

function SummaryPanel({ summary, topics, estimated, tone }) {
  const [showSummary, setShowSummary] = useState(false)

  function clickShowSummary() {
    setShowSummary(true)
  }

  function handleExit() {
    setShowSummary(false)
  }

  return (
    <>
      <SummaryModal 
      show={showSummary}
      onExit={handleExit}
      title="Summary"
      message={summary}
      />
      <div className='card-bg flex flex-col border-2 rounded '>
        <div className='my-5 mx-5'>
          <p className='headers'>Summary:</p>
          <button onClick={clickShowSummary}>Click To Open</button>
        </div>
        <div className='flex flex-row justify-center m-4'>
          <div className=''>
            <p className='headers'>Topics:</p>
            {topics.map((topic, i) => (
              <p key={i}> - {topic}</p>
            ))}
          </div>
          <div className='ml-10 self-center'>
            <p className='headers'>Etimated Reading Time:</p>
            <p className='mb-3'><span className='pop'>{estimated}</span> minutes</p>
            <p className='headers'>Tone: </p>
            <p>{tone}</p>
          </div>
        </div>
      </div>
      </>
  )
}

export default SummaryPanel