import React from 'react';
import './App.css';
import Paper from '@mui/material/Paper';
import Customers from './components/Customers';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {withStyles} from '@mui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 5, //theme.spacing.unit*3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }  
});

const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': "gilsoon nam",
  'birthday': 891023,
  'gender': "male",
  'job': "student"
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': "gildong hong",
  'birthday': 921212,
  'gender': "male",
  'job': "student"
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': "dongjeon jang",
  'birthday': 811139,
  'gender': "female",
  'job': "worker"
}  
]

class App extends React.Component {
  render(){
    const {classes} = this.props;
    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableCell> ID </TableCell>
            <TableCell> profile </TableCell>
            <TableCell> Name </TableCell>
            <TableCell> birthday </TableCell>
            <TableCell> gender </TableCell>
            <TableCell> job </TableCell>
          </TableHead>
          <TableBody>
            { customers.map(c => { return( <Customers key = {c.id} id = {c.id} image = {c.image}
                      name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); })
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
