import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
  root: { 
    maxWidth: 275,
  },
  content: {},
  actions: {}
});

export default function addressBook () {
  const classes = useStyles();
  return(
    <Container>
      <Grid>
        <FormControl>
          <Card className={classes.root}>
            <CardHeader 
              title={<Typography variant="h5" component="h2">My first Address</Typography>}
              action={<FormControlLabel 
                control={<Radio value="my-address" checked={false} color="primary" />}
              />}
            />
            <CardContent className={classes.content}>
              <Typography variant="body1">Sorocaba Street, 412, Apartment 01, 13339-390</Typography>
              <Typography variant="subtitle1" component="p">Indaituba - SP</Typography>
            </CardContent>
            <CardActions>
                <FormGroup row={true} >
                  <FormControlLabel 
                    control={<Checkbox checked={false} name="shipping" />}
                    label="Shipping"
                  />
                  <FormControlLabel 
                    control={<Checkbox checked={false} name="billing" />}
                    label="Billing"
                  />
                </FormGroup>
            </CardActions>
          </Card>
        </FormControl>
      </Grid>
    </Container>
  );
};