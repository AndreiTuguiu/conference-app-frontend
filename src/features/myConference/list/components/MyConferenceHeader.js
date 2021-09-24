import { Grid, makeStyles,Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { theme } from '@bit/totalsoft_oss.react-mui.themes.default-theme'

const useStyle = makeStyles(()=>({ title: {...theme.header.title, width:'100%' }  }))

const MyConferenceHeader = props => {
  const { title, actions } = props
  const classes = useStyle
  return (
    <Grid container justifyContent='flex-start' alignItems='center' >
      <Grid item xs={6} sm={9} lg={9} container justifyContent='flex-start'>
        <Typography variant="subtitle1" className={classes.title + ' ' + classes.caption}>
            {title}
        </Typography>
      </Grid>
      <Grid item xs={3} sm={3} lg={3} container justifyContent='flex-end'>
        {actions}
      </Grid>
    </Grid>
  )
}

MyConferenceHeader.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node
}

export default MyConferenceHeader
