import { useEffect, useState } from 'react'
import './App.css'
import { askGemini } from './functions/askGemini'
import Dashboard from './dashboard'
import { v4 as uuidv4 } from 'uuid';
import data from '../test'

function App() {
  const [file, setFile] = useState(null)
  const [sessionId, setSessionId] = useState('')
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    setSessionId(uuidv4())
  }, [location.search])
  
  const handleFileChange = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      setFile(uploadedFile)
      reader.onload = async (e) => {
        const contents = e.target.result;
        const geminiResponse = await askGemini(contents, sessionId)
        console.log(geminiResponse)
        setAnalysis(geminiResponse)
      };
      reader.readAsText(uploadedFile);
    }
  };

  return (
    <div className='relative'>
    {analysis ? <Dashboard analysis={analysis} sessionId={sessionId} /> : <div className="p-4">
      <input type="file" className='file_upload' onChange={handleFileChange} />
      {file && (
        <div className="mt-2">
          <p>File name: {file.name}</p>
          <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
          {analysis ? (
            ''
          ) : 'Loading..'}
        </div>
      )}
    </div>}
      
    </div>
  )
}

export default App
