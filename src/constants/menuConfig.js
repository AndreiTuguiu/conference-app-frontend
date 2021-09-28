import React from 'react'
import Welcome from '@material-ui/icons/Home'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"
import Event from '@material-ui/icons/Event';
import {EventNote}  from '@material-ui/icons';

const menuItems = [
  { icon: <Welcome />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' },
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu' },
  { icon: <Event />, text:'NavBar.Conferences', path:'/conference', name: 'Conferences' },
  { icon: <EventNote />, text:'NavBar.My Conferences', path:'/myConference', name: 'My Conferences' }
]

export default menuItems
