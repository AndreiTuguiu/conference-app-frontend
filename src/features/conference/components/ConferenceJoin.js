import React, { useEffect, useReducer } from 'react';
// import Typography from '@bit/totalsoft_oss.react-mui.typography';
import ConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import CancelButton from '@bit/totalsoft_oss.react-mui.cancel-button';
import { useHeader } from 'providers/AreasProvider'
import { useTranslation } from 'react-i18next'
import { useHistory } from "react-router-dom";
import {  useQueryWithErrorHandling } from 'hooks/errorHandling'
import { useRouteMatch } from 'react-router'
import { initialConference, reduce } from 'features/myConference/edit/conferenceState'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { MY_CONFERENCE_QUERY } from 'features/myConference/edit/gql/queries/ConferenceQuery';
import { useEmail } from 'hooks/useEmail';
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core';

const ConferenceJoin = () => {
    const match = useRouteMatch()
    const {t}= useTranslation()
    const history= useHistory()
    const addToast=useToast()
    const [, setHeader]=useHeader()
    const [conference, dispatch]= useReducer(reduce, initialConference)
    const {name}= conference
    const [email]=useEmail()
    const conferenceId = match.params.id
    const isNew = conferenceId === 'new'

    const { data , loading }= useQueryWithErrorHandling(MY_CONFERENCE_QUERY,{
        variables:{
            id: conferenceId,
            isNew
        },
        onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
    })
   
    useEffect(()=> () => setHeader(null), []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(()=> {
        setHeader(
            <ConferenceHeader title={name} actions={<CancelButton title={t('General.Buttons.Close')} onClick={history.goBack}/>}/>
        )
        },[history.goBack, name, setHeader, t])

    if(loading)
    return <LoadingFakeText lines={10}/>


    return <> Ceau pisi </>
}


export default ConferenceJoin