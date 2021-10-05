import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import { reduce, initialConference } from '../conferenceState'
import { useHeader } from 'providers/AreasProvider'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
// import { categories, cities, counties, countries, types } from 'utils/mocks/conferenceDictionaries'
import MyConference from './MyConference'
import { useHistory, useRouteMatch } from 'react-router'
// import { conference as mockConference } from 'utils/mocks/myConference'
import { useError, useQueryWithErrorHandling } from 'hooks/errorHandling'
import { MY_CONFERENCE_QUERY } from 'features/myConference/edit/gql/queries/ConferenceQuery'
import { useMutation } from '@apollo/client'
import { UPDATE_CONFERENCE } from '../gql/mutations/UpdateConference'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useEmail } from 'hooks/useEmail'
// import { DICTIONARY_QUERY } from 'features/conference/gql/queries/DictionaryQuery'

const MyConferenceContainer = () => {
  const match = useRouteMatch()
  const showError = useError()
  const { t } = useTranslation()
  const history = useHistory()
  const [, setHeader] = useHeader()
  const [email]= useEmail()
  const [conference, dispatch] = useReducer(reduce, initialConference)
  const addToast = useToast()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'
  

  const { data, loading: loadingConference } = useQueryWithErrorHandling(MY_CONFERENCE_QUERY, {
    variables: { id: conferenceId, isNew },
    onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
  })

  const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE, {
    onCompleted: result => {
      addToast(t('MyConference.SavingConference'), 'success')

      if (isNew) {
        history.push(`/myConference/${result?.saveConference?.id}`)
        return
      }

      result?.saveConference && dispatch({ type: 'resetData', payload: result?.saveConference })
    },
    onError: showError
  })

  const handleSave = useCallback(() => {
    const { id, name, startDate, endDate, deleteSpeakers, type, category, location, speakers } = conference
    const { city, county, country, ...locationData } = location
    const input = {
      id,
      name,
      startDate,
      endDate,
      deleteSpeakers,
      type:{...type,id:parseInt(type?.id)},
      category:{...category,id:parseInt(category?.id)},
      location: {
        ...locationData,
        cityId: city?.id,
        countyId: county?.id,
        countryId: country?.id
      },
      speakers,
      organizerEmail:email
    }
    updateConference({ variables: { input } })
  }, [conference, email, updateConference])

  useEffect(() => () => setHeader(null), []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setHeader(
      <MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} onClick={handleSave} />} />
    )
  }, [setHeader, t, conference.name, handleSave])

  // const { data, loading } = useQueryWithErrorHandling(DICTIONARY_QUERY)

  if (loadingConference || saving) return <LoadingFakeText lines={10} />

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
