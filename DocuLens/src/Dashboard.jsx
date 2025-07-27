import { useState } from 'react'
import SummaryPanel from './Components/SummaryPanel'
import StatsPanel from './Components/StatsPanel'
import EntityPanel from './Components/EntityPanel'
import StructurePanel from './Components/StructurePanel'
import VisulizationPanel from './Components/VisulizatinPanel'
import ChatWindow from './Components/ChatWindow'

function Dashboard({ analysis, sessionId }) {
  const data = analysis
  return (
    <>
    <ChatWindow sessionId={sessionId} />
    <div className='flex'>
      <button></button>
      <div className='relative flex flex-col w-10000'>
        <div className='m-5'>
          <SummaryPanel 
          summary={data.semanticInsights.summary} 
          topics={data.semanticInsights.mainTopics} 
          estimated={data.basicStats.readingTimeMinutes} 
          tone={data.languageQuality.tone} />
        </div>

        <div className='m-5'>
          <VisulizationPanel 
          commonWords={data.commonWords ?? { topWords: [] }} 
          themeFreq={data.semanticInsights.themeFrequency ?? []} 
          sentenceLen={data.commonWords.sentenceLengthHistogram ?? []} />
        </div>

        <div className='m-5'>
          <StructurePanel 
          sections={data.structure.sections} 
          metadata={data.structure} />
        </div>
      </div>
      <div className='relative flex flex-col'>
        <div className='m-5'>
          <StatsPanel 
          basicStats={data.basicStats} 
          languageQuality={data.languageQuality}  />
        </div>

        <div className="m-5">
          <EntityPanel 
          namedEntities={data.semanticInsights.namedEntities} 
          questions={data.semanticInsights.generatedQuestions}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard