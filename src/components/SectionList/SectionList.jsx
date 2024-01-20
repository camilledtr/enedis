import React from 'react'

const SectionList = ({ sections, currentSection, setCurrentSection }) => {
  const handleSectionChange = (section) => {
    setCurrentSection(section)
  }
      
  return (
    <div className='section-ul'>
      {sections.sort((sectionA, sectionB) => parseFloat(sectionB.p) - parseFloat(sectionA.p)).map(section => (
        <div key={section.id} onClick={() => {handleSectionChange(section)}} className='section-li'>
          <input type="radio" checked={section.id === currentSection.id} />
          {section.name} : {section.p}
        </div>
      ))}
    </div>
  )
}

export default SectionList