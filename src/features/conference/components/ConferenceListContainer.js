import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
// import conferences from 'utils/mocks/attendeesList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/'
import { generateDefaultFilters } from 'utils/functions'
import { useError, useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from '../gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
import { useFooter } from 'providers/AreasProvider'
// import { PagesRounded } from '@material-ui/icons'
import { extractPager } from 'utils/functions'
import { useMutation } from '@apollo/client'
import ATTEND_CONFERENCE from '../gql/mutations/AttendConference'
import DialogDisplay from '@bit/totalsoft_oss.react-mui.dialog-display'
import ConferenceCodeModal from './ConferenceCodeModal'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import { emptyArray, emptyString } from 'utils/constants'
import WITHDRAW_CONFERENCE from '../gql/mutations/WithdrawConference'

const ConferenceListContainer = () => {
  const { t } = useTranslation()
  const showError = useError()
  const [code, setCode] = useState()
  const [open, setOpen] = useState(false)
  const [suggestedConferences, setSuggestedConference] = useState(emptyArray)
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
  const addToast = useToast()
  const [email] = useEmail()
  const [, setFooter] = useFooter()

  useEffect(() => () => setFooter(null), []) // eslint-disable-line react-hooks/exhaustive-deps

  const [attend] = useMutation(ATTEND_CONFERENCE, {
    onError: showError,
    onCompleted: result => {
      if (result?.attend) {
        setCode(result?.attend.code)
        setSuggestedConference(result?.attend?.suggestedConferences)
        setOpen(true)
      }
      addToast(t('Conferences.SuccessfullyAttended'))
    }
  })
  const handleAttend = useCallback(
    conferenceId => () => {
      attend({
        variables: {
          input: {
            conferenceId,
            attendeeEmail: email
          }
        }
      })
    },
    [attend, email]
  )

  const [withdraw] = useMutation(WITHDRAW_CONFERENCE, {
    onCompleted: () => {
      addToast(t('Conferences.SuccessfullyWithdrawn'))
      refetch()
    },
    onError: showError
  })

  const handleWithdraw = useCallback(
    conferenceId => () => {
      withdraw({
        variables: {
          input: {
            conferenceId,
            attendeeEmail: email
          }
        }
      })
    },
    [email, withdraw]
  )

  const handleRowsPerPageChange = useCallback(pageSize => {
    setPager(state => ({ ...state, pageSize: parseInt(pageSize) }))
  }, [])

  const handleOnPageChange = useCallback(page => {
    setPager(state => ({ ...state, page }))
  }, [])

  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: { pager: extractPager(pager), filters, email },
    onCompleted: result => {
      const totalCount = result?.conferenceList.pagination?.totalCount
      setPager(state => ({ ...state, totalCount }))
    }
  })

  useEffect(() => {
    setFooter(
      <Pagination
        totalCount={pager.totalCount}
        page={pager.page}
        pageSize={pager.pageSize}
        rowsPerPageOptions={[3, 6, 12, 24, 100]}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handleOnPageChange}
        onRefresh={refetch}
      />
    )
  }, [handleOnPageChange, handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])

  const handleClose = useCallback(() => {
    setOpen(false)
    setCode(emptyString)
    refetch()
  }, [refetch, setCode, setOpen])

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])
  if (loading || !data) {
    return <LoadingFakeText lines={10} />
  }
  return (
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <ConferenceList conferences={data?.conferenceList.values} onAttend={handleAttend} onWithdraw={handleWithdraw} />
      <DialogDisplay
        id='showQRCode'
        open={open}
        onClose={handleClose}
        content={
          <ConferenceCodeModal
            title={t('General.Congratulations')}
            code={code}
            suggestedConferences={suggestedConferences}
            onAttend={handleAttend}
          />
        }
      />
    </>
  )
}

export default ConferenceListContainer
