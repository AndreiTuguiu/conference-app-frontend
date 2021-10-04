 import React  from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import { useTranslation } from 'react-i18next'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'
import { onTextBoxChange } from 'utils/propertyChangeAdapters'

const MyConferenceInfo = props => {
  const { types, categories, conference, dispatch } = props
  const { t } = useTranslation()
  const { name, startDate, endDate, type, category } = conference
  const handleChange = type => value => dispatch({ type: type, payload: value })

  return (
    <Grid container spacing={3}>
      <Grid item lg={9} container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <CustomTextField label={t('Conference.Name')} fullWidth value={name} onChange={onTextBoxChange(handleChange('name'))} />
        </Grid>
      </Grid>
      <Grid item lg={12} container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <DateTime label={t('Conference.StartDate')} showTime={true} clearable value={startDate} onChange={handleChange('startDate')} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DateTime label={t('Conference.EndDate')} showTime={true} clearable value={endDate} onChange={handleChange('endDate')} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Conference.Type')}
            fullWidth
            isClearable
            creatable
            options={types}
            value={type}
            onChange={handleChange('type')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Conference.Categories')}
            fullWidth
            isClearable
            creatable
            options={categories}
            value={category}
            onChange={handleChange('category')}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

MyConferenceInfo.propTypes = {
  types: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  conference: PropTypes.object,
  dispatch: PropTypes.func
}

export default MyConferenceInfo
