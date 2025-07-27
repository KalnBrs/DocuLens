import './HomePage.css'
import { Upload } from "lucide-react";
import { BarLoader } from 'react-spinners'

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


function HomePage({handleFileChange, isLoading}) {
  return (
    <>
      <div className='welcome-bg p-10 border-4 rounded'>
        <h1 className='m-5'>Welcome to DocuLens</h1>
        <p className='max-w-200'>Your smart, AI-powered document analysis tool that transforms raw text into meaningful insights. Whether you're a student, researcher, journalist, or professional, DocuLens helps you understand your documents faster and deeper.</p>
        <div className="p-4">
          <label className='cursor-pointer flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-md transition-all duration-200 justify-between'>
            <span className='flex flex-row'>
              <Upload className="w-5 h-5 mr-2" />
              <p>Upload File</p>
              <input type="file" className='hidden'  accept='.txt' onChange={handleFileChange} />
            </span>
            <p className='text-right'>Accept: .txt</p>
          </label>
        </div>
      </div>

      {isLoading ? <div className='loading'><BarLoader  color='#0069a8' height={20} width={500} /></div>  : ''}

      
    </>
  )
}

export default HomePage