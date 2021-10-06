/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'
import { useEmail } from 'hooks/useEmail'
import Welcome from 'features/welcome/Welcome'
import Settings from 'features/settings/Settings'
import { Forbidden, NotFound } from '@bit/totalsoft_oss.react-mui.kit.core'
import HelloWorld from 'features/helloWorld/HelloWorld'
import ConferenceListContainer from 'features/conference/components/ConferenceListContainer'
import MyConferenceListContainer from 'features/myConference/list/components/MyConferenceListContainer'
import MyConferenceContainer from 'features/myConference/edit/components/MyConferenceContainer'
import ConferenceJoin from 'features/conference/components/ConferenceJoin'

export default function AppRoutes() {
  const [email] = useEmail()
  if(!email){
    return <Switch>
    <CustomRoute isPrivate={false} exact path="/welcome" component={Welcome} />
  <Redirect to="/welcome" />
  </Switch>
  }
  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path='/conference' component={ConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myConference' component={MyConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/helloWorld' component={HelloWorld} />
      <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
      <CustomRoute isPrivate={false} exact path='/myConference/:id(new)' component={MyConferenceContainer} />
      <CustomRoute isPrivate={false} exact path='/myConference/:id(\d+)' component={MyConferenceContainer} />
      <CustomRoute isPrivate={false} exact path='/JoinConference/:id(\d+)' component={ConferenceJoin} />
      <CustomRoute exact path='/settings' component={Settings} />
      <Redirect exact from='/' to='/dashboard' />
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />
    </Switch>
  )
  
    
}
