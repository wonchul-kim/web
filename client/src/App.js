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
  },
  tableHead: {
    fontSize: "1.0rem"
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    marginRight: 30,
    display: 'flex',
    justifyContent: 'right' 
  }
});


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


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

props or state??? ?????? ?????? ???????????? => shouldComponentUpdate()

??? ?????? ?????? 3) render()??? ?????????

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
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => { // ?????? ????????? ????????? ????????? ??????????????? ?????????????????? ?????????! ?????? ???????????? ?????????!
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });

    this.callApi()
    .then(res => this.setState({customers: res})) // callApi????????? ????????? ?????????(body)??? res?????? ????????? ????????????, ?????? res??? ????????????     
                                                  // setState??? ???????????? customer ????????? ??????
    .catch(err => console.log(err));
  }

  componentDidMount(){ // Api?????? ????????? ??? ???????????? componentDidMount()?????? ??????. 
    this.timer = setInterval(this.progress, 20); // 0.02????????? progress ????????? ????????????.
    this.callApi()
      .then(res => this.setState({customers: res})) // callApi????????? ????????? ?????????(body)??? res?????? ????????? ????????????, ?????? res??? ????????????     
                                                    // setState??? ???????????? customer ????????? ??????
      .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json(); // response ???????????? ????????? ???????????? json ????????? ?????? body ????????? ??????

    return body
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  handleVlueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render(){ 
    const {classes} = this.props;
    const filteredComponents = (data) =>{
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      }); 

      return data.map((c) => {
        return <Customers stateRefresh={this.stateRefresh} key={c.id} id={c.id} image = {c.image} name = {c.name} 
            birthday = {c.birthday} gender = {c.gender} job = {c.job} /> 
      });
    }
    const cellList = ['??????', '?????????', '??????', '????????????', '??????', '??????', '??????']
    return(
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Customer Management Sys.
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search customers"
                  inputProps={{ 'aria-label': 'search' }}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  name="searchKeyword"
                  value={this.state.searchKeyword}
                  onChange={this.handleVlueChange}
                />
              </Search>
            </Toolbar>
          </AppBar>
            <div className={classes.menu}>
              <CusotmersAdd stateRefresh={this.stateRefresh} />
            </div>
        </Box>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
              {/* <TableCell> ID </TableCell>
              <TableCell> profile </TableCell>
              <TableCell> Name </TableCell>
              <TableCell> birthday </TableCell>
              <TableCell> gender </TableCell>
              <TableCell> job </TableCell>
              <TableCell> ?????? </TableCell> */}
            </TableHead>
            <TableBody>
              {/* { customers.map(c => { return( <Customers key = {c.id} id = {c.id} image = {c.image}
                        name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); })
              } */}
              
              {/* ????????? ?????????????????? ??????????????? ????????? ???????????? ???????????? ????????? ????????? ????????? ??????. 
              ?????????, ???????????? ???????????? ?????? ????????? ????????????. 
              ?????? progress bar??? ?????? */}
              { this.state.customers ? 
                      // this.state.customers.map(c => { 
                      //   return( <Customers stateRefresh={this.stateRefresh} key = {c.id} id = {c.id} image = {c.image}
                      //   name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); })
                      filteredComponents(this.state.customers)
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
      </div>
    );
  }
}

export default withStyles(styles)(App);
