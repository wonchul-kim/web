import React, {Component} from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

class Customers extends Component{
    render(){
        return (
            <TableRow>
                <TableCell> {this.props.id} </TableCell>
                <TableCell> <img src={this.props.image} /> </TableCell>
                <TableCell> {this.props.name} </TableCell>
                <TableCell> {this.props.birthday} </TableCell>
                <TableCell> {this.props.gender} </TableCell>
                <TableCell> {this.props.job} </TableCell>
            </TableRow>
        );
    }
} 


class CustomersProfile extends Component{
    render(){
        return (
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name} ({this.props.id})</h2>
            </div>
        );
    }
}

class CustomersInfo extends Component{
    render(){
        return(
            <div>
                <p> {this.props.birthday}</p>
                <p> {this.props.gender} </p>
                <p> {this.props.job}</p>
            </div>
        )
    }
}
export default Customers; 