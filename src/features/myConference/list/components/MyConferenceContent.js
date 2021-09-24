import React from "react";
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next";
import state from "constants/attendeeStatus";
import { Grid, Typography } from "@material-ui/core";
import Button from "@bit/totalsoft_oss.react-mui.button";


const MyConferenceContent = props => {
    const {conference} = props
    const { startDate, endDate, type, category } = conference
    // confirm.state === state.Attended

    const {t} = useTranslation()


    const startDateFormatted= t('DATE_FORMAT', {date:{value:startDate,format:'DD-MM-YYYY HH:mm'}})
    const endDateFormatted= t('DATE_FORMAT', {date:{value:endDate,format:'DD-MM-YYYY HH:mm'}})


    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${type?.name} , ${category?.name}`}</Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button right size='sm' color="danger">
                        {t('My Conference.Delete')}
                    </Button>
                    <Button right size='sm' color="info">
                        {t('My Conference.Edit')}
                    </Button>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

MyConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired
}

export default MyConferenceContent