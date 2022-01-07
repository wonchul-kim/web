import React from 'react';
import './App.css';
import Paper from '@mui/material/Paper';
import Customers from './components/Customers';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { withStyles, makeStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material';
import CusotmersAdd from './components/CustomersAdd';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 3, //theme.spacing.unit*3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: 3, //theme.spacing.unit*2,
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

/*
React LifeCycle 

1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

*/

/*

props or state에 의해 값이 변경되면 => shouldComponentUpdate()

그 다음 다시 3) render()가 실행됨

*/

class App extends React.Component {

  // state = {
  //   customers: "",
  //   completed: 0
  // }

  constructor(props){
    super(props);
    this.state = {
      customers: '', 
      completed: 0
    }
  }

  stateRefresh = () => { // 고객 정보에 변경이 있으면 고객정보만 새로고침하기 위해서! 전체 페이지가 아니라!
    this.setState({
      customers: '',
      completed: 0
    });

    this.callApi()
    .then(res => this.setState({customers: res})) // callApi로부터 받아온 데이터(body)를 res라는 변수로 받아오고, 이를 res에 저장하여     
                                                  // setState를 활용하여 customer 변수에 저장
    .catch(err => console.log(err));
  }

  componentDidMount(){ // Api에서 통신을 할 경우에는 componentDidMount()에서 한다. 
    this.timer = setInterval(this.progress, 20); // 0.02초마다 progress 함수를 실행한다.
    this.callApi()
      .then(res => this.setState({customers: res})) // callApi로부터 받아온 데이터(body)를 res라는 변수로 받아오고, 이를 res에 저장하여     
                                                    // setState를 활용하여 customer 변수에 저장
      .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json(); // response 변수에서 받아온 데이터를 json 형태로 하여 body 변수에 저장

    return body
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }
  render(){
    const {classes} = this.props;
    return(
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableCell> ID </TableCell>
              <TableCell> profile </TableCell>
              <TableCell> Name </TableCell>
              <TableCell> birthday </TableCell>
              <TableCell> gender </TableCell>
              <TableCell> job </TableCell>
              <TableCell> 설정 </TableCell>
            </TableHead>
            <TableBody>
              {/* { customers.map(c => { return( <Customers key = {c.id} id = {c.id} image = {c.image}
                        name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); })
              } */}
              
              {/* 통신은 비동기적으로 이루어지기 때문에 데이터를 받아오지 못하는 경우도 생길수 있다. 
              따라서, 데이터를 받아오지 못한 경우도 고려한다. 
              이를 progress bar로 구현 */}
              { this.state.customers ? this.state.customers.map(c => { 
                        return( <Customers stateRefresh={this.stateRefresh} key = {c.id} id = {c.id} image = {c.image}
                        name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); })
                :
                <TableRow>
                  <TableCell colSpan='6' align='center'>
                    <CircularProgress className={classes.progress} variant='determinate' value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }            
            </TableBody>
          </Table>
        </Paper>
        <CusotmersAdd stateRefresh={this.stateRefresh} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
