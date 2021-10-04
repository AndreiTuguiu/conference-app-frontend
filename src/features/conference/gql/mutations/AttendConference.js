import { gql } from '@apollo/client'
import ConferenceFragments from '../queries/fragment'
import CommonFragment from 'features/common/fragments'

const ATTEND_CONFERENCE = gql`
  mutation attend($input: Attendee) {
    attend(input: $input){
      code
      suggestedConferences{
        ...conference
      type {
        ...type
      }
      category {
        ...category
      }
      location {
        ...location
        city {
         ...city
        }
        county {
          ...county
        }
        country {
         ...country
        }
      }
      speakers {
        ...speaker
      }
      }
    }
  }
  ${ConferenceFragments.conference}
  ${ConferenceFragments.location}
  ${ConferenceFragments.speaker}
  ${CommonFragment.category}
  ${CommonFragment.city}
  ${CommonFragment.type}
  ${CommonFragment.county}
  ${CommonFragment.country}
`

export default ATTEND_CONFERENCE
