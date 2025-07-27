import { useEffect, useState } from 'react'
import './App.css'
import { askGemini } from './functions/askGemini'
import Dashboard from './dashboard'
import { v4 as uuidv4 } from 'uuid';
import HomePage from './Components/HomePage/HomePage';

function App() {
  const [file, setFile] = useState(null)
  const [sessionId, setSessionId] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [isUploading, setUploading] = useState(false)

  useEffect(() => {
    setSessionId(uuidv4())
  }, [])
  
  const handleFileChange = async (event) => {
    console.log('Chekc')
    setUploading(true)
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      setFile(uploadedFile)
      reader.onload = async (e) => {
        const contents = e.target.result;
        const geminiResponse = await askGemini(contents, sessionId)
        setAnalysis(geminiResponse)
        setUploading(false)
      };
      reader.readAsText(uploadedFile);
    }
  };

  return (
    <div className='relative'>
    {analysis ? <Dashboard analysis={analysis} sessionId={sessionId} /> : <HomePage file={file} handleFileChange={handleFileChange} analysis={analysis} isLoading={isUploading}/>}
    </div>
  )
}

export default App
