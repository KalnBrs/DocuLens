import { useState } from 'react'
import SummaryPanel from './Components/SummaryPanel'
import StatsPanel from './Components/StatsPanel'
import EntityPanel from './Components/EntityPanel'
import StructurePanel from './Components/StructurePanel'

function Dashboard({ analysis }) {
  const data = JSON.parse(analysis)
  return (
    <div className='flex'>
      <div className='relative flex flex-col'>
        <SummaryPanel summary={data.semanticInsights.summary} topics={data.semanticInsights.mainTopics} estimated={data.basicStats.readingTimeMinutes} tone={data.languageQuality.tone} />
        {/* Visulization */}
        <StructurePanel sections={data.structure.sections} metadata={data.structure} />
      </div>
      <div className='relative flex flex-col'>
        <StatsPanel basicStats={data.basicStats} languageQuality={data.languageQuality}  />
        <EntityPanel namedEntities={data.semanticInsights.namedEntities} questions={data.semanticInsights.generatedQuestions}/>
      </div>
    </div>
  )
}

export default Dashboard