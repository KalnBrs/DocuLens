import { useState } from 'react'
import './StructurePanel.css'

function StructurePanel({sections, metadata}) {
  const [sectionShow, setSectionShow] = useState(false)
  const [currSection, setCurrSection] = useState({secName: '', content: ''})

  function handleClick(secName, content) {
    setSectionShow(true)
    setCurrSection({ secName: secName, content: content})
  }

  function handleExit() {
    setSectionShow(false)
    setCurrSection({secName: '', content: ''})
  }

  return (
    <>
      <StructureModal
        show={sectionShow}
        onExit={handleExit}
        title={currSection.secName}
        message={currSection.content}
      />
      <div className='card-bg justify-center flex flex-row border-2 p-5'>
        <div className='flex flex-col'>
          <p className='headers'>Sections: </p>
            {sections.map((section, i) => (
              <Section key={i} section={section} clickFunc={handleClick} />
            ))}
        </div>
        <div className='flex flex-col ml-2.5 pl-2.5 border-l-1'>
          <p className='headers'>Stats: </p>
          <Cluster title={'Bullet Point Count:'} value={metadata.bulletPointCount}/>
          <Cluster title={'Heading Count:'} value={metadata.headingCount}/>
          <Cluster title={'Bolded Words:'} value={metadata.formattingCounts.bold}/>
          <Cluster title={'Italicized Words:'} value={metadata.formattingCounts.italic}/>
        </div>
      </div>
    </>
  )
}

function Cluster({title, value}) {
  return (
    <div className='flex flex-row mb-5 items-center'>
      <p className='headers text-base mr-2'>{title}</p>
      <p className='font-bold text-base'>{value}</p>
    </div>
  )
}

function Section({section, clickFunc}) {
  return (
    <div className='flex flex-row items-center justify-between'>
      <p className='mr-10'>{section.name}</p>
      <button onClick={() => clickFunc(section.name, section.contentSnippet)} >View Snippet</button>
    </div>
  )
}

function StructureModal({show, message, title, onExit}) {
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

export default StructurePanel