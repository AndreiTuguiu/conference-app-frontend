import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
import myConferences from 'utils/mocks/organizersList'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/'
import { generateDefaultFilters } from 'utils/functions'
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import { useTranslation } from 'react-i18next'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'

const MyConferenceListContainer = () => {
  const { t } = useTranslation()
  const { data, loading } = { data: myConferences, loading: false }
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [, setHeader] = useHeader()
  const history = useHistory()

  const handleAddClick = useCallback(() => {
      history.push('/myConference/new')
  }, [history])

  useEffect(() => {
    //did mount
    return () => {
      // will unmount
      setHeader(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setHeader(
      <MyConferenceHeader
        title={t('NavBar.My Conferences')}
        actions={<AddButton key='addButton' title={t('Conferences.AddConference')} onClick={handleAddClick}/>}
      />
    )
  }, [setHeader, t])

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])
  if (loading) {
    return <LoadingFakeText lines={10} />
  }
  return (
    <>
      <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <MyConferenceList conferences={data} />
    </>
  )
}

export default MyConferenceListContainer
