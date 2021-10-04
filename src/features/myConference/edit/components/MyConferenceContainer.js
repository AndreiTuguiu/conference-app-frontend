import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import { reduce, initialConference } from '../conferenceState'
import { useHeader } from 'providers/AreasProvider'
import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
// import { categories, cities, counties, countries, types } from 'utils/mocks/conferenceDictionaries'
import MyConference from './MyConference'
import { useRouteMatch } from 'react-router'
// import { conference as mockConference } from 'utils/mocks/myConference'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { MY_CONFERENCE_QUERY } from 'features/myConference/edit/gql/queries/ConferenceQuery'
// import { DICTIONARY_QUERY } from 'features/conference/gql/queries/DictionaryQuery'

const MyConferenceContainer = () => {
  const match = useRouteMatch()
  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  const [conference, dispatch] = useReducer(reduce, initialConference)

  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'

  const {data, loading:loadingConference} = useQueryWithErrorHandling(MY_CONFERENCE_QUERY,{
    variables:{id:conferenceId, isNew},
    onCompleted: result=> result?.conference && dispatch({type:'resetConference',payload: result.conference})
  })

 

  useEffect(() => () => setHeader(null), []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} />} />)
  }, [setHeader, t, conference.name])

  // const { data, loading } = useQueryWithErrorHandling(DICTIONARY_QUERY)
  

  if (loadingConference)  return <LoadingFakeText lines={10} />

  return (
    <MyConference
      conference={conference}
      dispatch={dispatch}
      types={data?.typeList}
      categories={data?.categoryList}
      countries={data?.countryList}
      counties={data?.countyList}
      cities={data?.cityList}
    />
  )
}

export default MyConferenceContainer
