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

// const customers = [{
//   'id': 1,
//   'image': 'https://placeimg.com/64/64/1',
//   'name': "gilsoon nam",
//   'birthday': 891023,
//   'gender': "male",
//   'job': "student"
// },
// {
//   'id': 2,
//   'image': 'https://placeimg.com/64/64/2',
//   'name': "gildong hong",
//   'birthday': 921212,
//   'gender': "male",
//   'job': "student"
// },
// {
//   'id': 3,
//   'image': 'https://placeimg.com/64/64/3',
//   'name': "dongjeon jang",
//   'birthday': 811139,
//   'gender': "female",
//   'job': "worker"
// }  
// ]

class App extends React.Component {

  state = {
    customers: ""
  }

  componentDidMount(){
    this.callApi()
      .then(res => this.setState({customers: res})) // callApi로부터 받아온 데이터(body)를 res라는 변수로 받아오고, 이를 res에 저장하여     
                                                    // setState를 활용하여 customer 변수에 저장
      .then(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json(); // response 변수에서 받아온 데이터를 json 형태로 하여 body 변수에 저장

    return body
  }

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
            {/* { customers.map(c => { return( <Customers key = {c.id} id = {c.id} image = {c.image}
                      name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); })
            } */}
            { this.state.customers ? this.state.customers.map(c => { return( <Customers key = {c.id} id = {c.id} image = {c.image}
                      name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); }) : ""
            }
            
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
