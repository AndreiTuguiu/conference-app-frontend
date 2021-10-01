import {gql} from '@apollo/client'
import ConferenceFragments from './fragments'
import CommonFragment from 'features/common/fragments'

export const MY_CONFERENCE_QUERY = gql`
query conferenceById($id: ID!, $isNew:Boolean!) {
    conference(id: $id) @skip(if:$isNew) {
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
    typeList {
    id
    name
    code
  }
  categoryList{
    id
    name
  }
  countryList{
    id 
    name
    code
  }
  countyList{
    id
    name
    code
  }
  cityList{
    id
    name
    code
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