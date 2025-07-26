import { useState } from 'react'
import './App.css'
import { askGemini } from './functions/askGemini'
import Dashboard from './dashboard'
import data from '../test'

function App() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [analysis, setAnalysis] = useState(data)
  
  const handleFileChange = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      setFile(uploadedFile)
      reader.onload = async (e) => {
        const contents = e.target.result;
        setText(contents)
        setAnalysis(await askGemini(contents))
      };
      reader.readAsText(uploadedFile);
    }
  };

  return (
    <div className='relative'>
    {analysis ? <Dashboard analysis={analysis} /> : <div className="p-4">
      <input type="file" className='file_upload' onChange={handleFileChange} />
      {file && (
        <div className="mt-2">
          <p>File name: {file.name}</p>
          <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
          {analysis ? (
            <p>{JSON.stringify(analysis)}</p>
          ) : 'Loading..'}
        </div>
      )}
    </div>}
      
    </div>
  )
}

export default App
