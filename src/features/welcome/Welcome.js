import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import CustomIconButton from '@bit/totalsoft_oss.react-mui.icon-button'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';


function Welcome() {
  const { t } =useTranslation()
  return (
      <Grid container justify="center" alignItems="center" alignContent="center" direction="column" spacing={10}>
        <Grid item xs={4}>
          <Typography variant="h5">{t("LandingPage.Title")}</Typography>
        </Grid>
        <Grid item container justify="center" alignContent="center" alignItems="center" direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="caption">{t("LandingPage.Subtitle")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              endAdornment={
                <CustomIconButton size="small" color="theme" aria-label="go">
                  <KeyboardReturnIcon fontSize="small" />
                </CustomIconButton>
              }
              />
          </Grid>
        </Grid>
       </Grid>
  )
}

export default Welcome
