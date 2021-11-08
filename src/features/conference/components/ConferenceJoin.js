import React, { useCallback, useEffect, useReducer, useState } from 'react'
import ReactStars from 'react-stars'
import { render } from 'react-dom'
// import Typography from '@bit/totalsoft_oss.react-mui.typography';
import ConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import CancelButton from '@bit/totalsoft_oss.react-mui.cancel-button'
import { useHeader } from 'providers/AreasProvider'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useError, useQueryWithErrorHandling } from 'hooks/errorHandling'
import { useRouteMatch } from 'react-router'
import { initialConference, reduce } from 'features/myConference/edit/conferenceState'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { MY_CONFERENCE_QUERY } from 'features/myConference/edit/gql/queries/ConferenceQuery'
import { useEmail } from 'hooks/useEmail'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
import { Box, Grid, ListItem, ListItemText } from '@material-ui/core'
import USERS_LIST_QUERY from '../gql/queries/UsersListQuery'
import { useMutation } from '@apollo/client'
import ATTEND_CONFERENCE from '../gql/mutations/AttendConference'
import { result } from 'lodash'

const ConferenceJoin = () => {
  const match = useRouteMatch()
  const { t } = useTranslation()
  const showError = useError()
  const history = useHistory()
  const addToast = useToast()
  const [code, setCode] = useState()
  const [open, setOpen] = useState(false)
  const [, setHeader] = useHeader()
  const [conference, dispatch] = useReducer(reduce, initialConference)
  const { name } = conference
  const [email] = useEmail()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'

  const { data, loading } = useQueryWithErrorHandling(USERS_LIST_QUERY, {
    variables: {
      id: conferenceId
    }
  })

  const { data: conferenceData, loading: loadingConference } = useQueryWithErrorHandling(MY_CONFERENCE_QUERY, {
    variables: {
      id: conferenceId,
      isNew
    },
    onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
  })

  // const [attend] = useMutation(ATTEND_CONFERENCE,{
  //     onError:showError,
  //     onCompleted: result => {
  //         if (result?.attend){
  //             setCode(result?.attend.code),
  //             setOpen(true)
  //         }
  //         addToast(t('Conference.SuccessfullyLeft'),'success')
  //     }
  // })

  // const handleLeave = useCallback(
  //     conferenceId => () => {
  //       attend({
  //         variables: {
  //           input: {
  //             conferenceId,
  //             attendeeEmail: email
  //           }
  //         }
  //       })

  //     },

  //     [attend, email]
  //   )

  useEffect(() => () => setHeader(null), []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setHeader(<ConferenceHeader title={name} actions={<CancelButton title={t('General.Buttons.Close')} onClick={history.goBack} />} />)
  }, [history.goBack, name, setHeader, t])

  const ratingChanged = newRating => {
    console.log(newRating)
  }

  if (loading || loadingConference) {
    return <LoadingFakeText lines={10} />
  }
  return (
    <>
      <Grid container>
        <Grid container justifyContent='center' xs={8}>
          <Grid container item direction='column'>
            <Typography>Nume: {conferenceData?.conference?.name}</Typography>
            <Typography>Email organizator: {conferenceData?.conference?.organizerEmail}</Typography>
            <Typography>Start date: {conferenceData?.conference?.startDate}</Typography>
            <Typography>End date: {conferenceData?.conference?.endDate}</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent='center' xs={4} direction='column'>
          <ReactStars count={5} size={24} color2={'#ffd700'} />
          <Typography variant='h6' justifyContent='center'>
            Participants
          </Typography>
          {data?.users?.map(element => (
            <Grid item key={data.users.indexOf(element)}>
              <Typography>{element.attendeeEmail}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent='center' xs={4} direction='column'>
          <Typography variant='h6' justifyContent='center'>
            Speakers
          </Typography>
          {conferenceData?.conference?.speakers?.map(element => (
            <Grid item key={element.id}>
              <Typography>{element.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default ConferenceJoin
