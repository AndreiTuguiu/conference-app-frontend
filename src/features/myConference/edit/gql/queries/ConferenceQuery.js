import {gql} from '@apollo/client'
import ConferenceFragments from './fragments'
import CommonFragment from 'features/common/fragments'

export const MY_CONFERENCE_QUERY = gql`
query conferenceById($id: ID!) {
    conference(id: $id) {
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
  ${ConferenceFragments.conference}
  ${ConferenceFragments.location}
  ${ConferenceFragments.speaker}
  ${CommonFragment.category}
  ${CommonFragment.city}
  ${CommonFragment.type}
  ${CommonFragment.county}
  ${CommonFragment.country}
  `