import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

class CustomerDelete extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            open: false
        }
    }

    handleCickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({ // 모든 정보에 대한 초기화
            open: false
        });
    }

    deleteCustomer(id){
        // restAPI에서는 다음과 같이 id로 url에 접근하여 데이터를 삭제한다.
        const url = '/api/customers/' + id
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }    

    render(){
        return(
            <div>
                <Button variant="contained" onClick={this.handleCickOpen}>
                    삭제             
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <dialogActions>
                        <Button variant='contained' color='primary' onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
                    </dialogActions>
                </Dialog>
            </div> 
        );
    }
}

export default CustomerDelete;