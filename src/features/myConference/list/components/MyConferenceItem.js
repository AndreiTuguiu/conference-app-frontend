import React from 'react'
import PropTypes from 'prop-types'
import RegularCard from '@bit/totalsoft_oss.react-mui.regular-card'
import MyConferenceSubtitle from './MyConferenceSubtitle'
import MyConferenceContent from './MyConferenceContent'

const MyConferenceItem = props => {
  const { conference } = props
  const { name, speakers, location } = conference
  const speaker = speakers.find(speaker => speaker.isMainSpeaker)
  return (
    <RegularCard
      cardTitle={name}
      cardSubtitle={<MyConferenceSubtitle speaker={speaker} location={location} />}
      content={<MyConferenceContent conference={conference} />}
    />
  )
}

MyConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired
}

export default MyConferenceItem
