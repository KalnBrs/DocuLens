import './StatsPanel.css'

function StatsPanel({basicStats, languageQuality}) {
  return (
    <>
      <div className='card-bg border-2 rounded p-5'>
        <Cluster title={'Word Count:'} value={basicStats.wordCount} info={'How many words are in the document'}/>
        <Cluster title={'Sentance Count:'} value={basicStats.sentenceCount} info={'How many sentances there are in the document'}/>
        <Cluster title={'Paragraph Count:'} value={basicStats.paragraphCount} info={'How many paragraphs there are in the document'} />
        <Cluster title={'Average Sentence Length:'} value={basicStats.averageSentenceLength + ' words'} />
        <Cluster title={'Lexical Density:'} value={basicStats.lexicalDensity < 1 ? Math.trunc((basicStats.lexicalDensity * 100), 10) + '%': basicStats.lexicalDensity + '%'} info={'A measure of how much information a text conveys, specifically the proportion of content words (like nouns, verbs, adjectives, and adverbs) to the total number of words.'}/>
        <Cluster title={'Reading Level: '} value={languageQuality.readabilityGrade} />
        <Cluster title={'Passive Voice Percentage'} value={languageQuality.passiveVoicePercent + '%'} info={'The proportion of sentences in a piece of writing that use the passive voice.'} />
      </div>
    </>
  )
}
function Cluster({ title, value, info }) {
  return (
    <>
      <p title={info} className='headers'>{title}</p>
      <p>{value}</p>
    </>
  )
}

export default StatsPanel