import React, { useCallback, useState } from 'react'
import { Typography, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import CustomIconButton from '@bit/totalsoft_oss.react-mui.icon-button'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import { emptyString } from 'utils/constants'
import { useEmail } from 'hooks/useEmail'
import { validateEmail } from 'utils/functions'

function Welcome() {
  const { t } = useTranslation()

  const [email, setEmail] = useEmail()
  const [inputValue, setInputValue] = useState(email)

  const handleInputChange = useCallback(e => setInputValue(e.target.value), [])

  const handleButtonClick = useCallback(() => {
    const isEmailValid = validateEmail(inputValue)
    setEmail(isEmailValid ? inputValue : emptyString)
  }, [setEmail, inputValue])
  const handleKeyDown = useCallback(
    event => {
      if (event.keyCode === 13) {
        handleButtonClick()
      }
    },
    [handleButtonClick]
  )


    // inputValue |> when(validateEmail,setInputValue },[inputValue])
    

  return (
    <Grid container justify='center' alignItems='center' alignContent='center' direction='column' spacing={10}>
      <Grid item xs={4}>
        <Typography variant='h5'>{t('LandingPage.Title')}</Typography>
      </Grid>
      <Grid item container justify='center' alignContent='center' alignItems='center' direction='column' spacing={2}>
        <Grid item xs={12}>
          <Typography variant='caption'>{t('LandingPage.Subtitle')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            endAdornment={
              <CustomIconButton size='small' color='theme' aria-label='go' onClick={handleButtonClick}>
                <KeyboardReturnIcon fontSize='small' />
              </CustomIconButton>
            }
            onKeyDown={handleKeyDown}
            value={inputValue}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Welcome
