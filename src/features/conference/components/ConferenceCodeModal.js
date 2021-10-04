import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import qrCode from 'assets/img/qrCode.png'

const ConferenceCodeModal = ({ code }) => {
  const { t } = useTranslation()
  return (
    <Grid container justifyContent={'center'}>
      <Grid item>
        <img src={qrCode} alt='QR' style={{maxHeight:'400px'}}/>
      </Grid>
      <Grid item>
        <Typography variant='subtitle1'>{t('Conferences.QRCodeMessage', { code })}</Typography>
      </Grid>
    </Grid>
  )
}

ConferenceCodeModal.propTypes = {
  code: PropTypes.string
}

export default ConferenceCodeModal
