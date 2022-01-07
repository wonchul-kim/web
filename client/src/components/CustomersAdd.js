import React, { Component } from 'react';
import { post } from 'axios';
import { Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = theme => ({
    hidden: {
        display: "none"
    }
});

class CustomersAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { // 모든 정보에 대한 초기화
            file: null, // profile image로서 byte 형태의 데이터 
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '', // 보내고자 하는 file(여기서는 profile image)의 이미지 이름
            open: false // modal이 열려있는지에 대한 flag
        }
    }

    // 정보를 모두 작성하고, submit를 해서 이 내용이 DB에 저장된다고 해서 front에 새로운 내용이 반영되지는 않는다. 
    // 이를 위해서 다시 서버로부터 데이터를 받아서 표시하도록 해야한다. 
    // 이는 react의 특성으로, 페이지의 변화된 부분만 새로고침이 되기 때문이다. 
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({ // 모든 정보에 대한 초기화
            file: null, // profile image로서 byte 형태의 데이터 
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '', // 보내고자 하는 file(여기서는 profile image)의 이미지 이름
            open: false
        });
        // window.location.reload(); // 시험적으로 해당 window를 그냥 새로고침
        // // 이는 필요한 부분만 새로고침하도록 고치자!!
        

    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], // file을 하나씩 업로드하기 위해서는 index를 정해준다.
            fileName: e.target.value,
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
         
    }

    addCustomer = () => { // 작성한 form의 정보들을 server로 보내주는 함수 
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        // file이 포함되어 있는 데이터를 전송하고자 할 때에는 map 표준에 맞는 header를 추가해주어야 한다. 
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({ // 모든 정보에 대한 초기화
            file: null, // profile image로서 byte 형태의 데이터 
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '', // 보내고자 하는 file(여기서는 profile image)의 이미지 이름
            open: false
        });
    }

    render(){
        const {classes} = this.props;

        return(
            <div>
                <Button variant='contained' color='primary' onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle> 고객 추가 </DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> 
                        <label htmlFor="raised-button-file">
                            <Button varaint="co ntained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label='이름' type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br/>
                        <TextField label='생년원일'type='text' name='birthday' value={this.state.birthday} onChange={this.handleValueChange} />  <br/>
                        <TextField label='성별' type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange} /> <br/>
                        <TextField label='직업' type='text' name='job' value={this.state.job} onChange={this.handleValueChange} />  <br/>
                    </DialogContent> 
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}> 추가 </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}> 닫기 </Button>
                    </DialogActions>
                </Dialog>
            </div>

            // <form onSubmit={this.handleFormSubmit}>
            //     <h1> 고객 추가 </h1>
            //     {/* // 어떤 값들을 server로 보내줄지 지정하기 위해서는 input tag를 이용한다. */}
            //     {/* // 이 때, 해당 변수들의 각각의 상태변화를 감지하기 위해서 onChange 함수가 사용된다.  */}
            //     프로파일 이미지: <input type='file' name='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> <br />
            //     이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br />
            //     생년월일: <input type='text' name='birthday' value={this.state.birthday} onChange={this.handleValueChange} /> <br />  
            //     성별: <input type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange} /> <br />  
            //     직업: <input type='text' name='job' value={this.state.job} onChange={this.handleValueChange} /> <br />  

            //     {/* // 이 버튼을 누르면 자동으로 handleformsubmit 함수가 호출된다.  */}
            //     <button type="submit"> 추가하기 </button> 
                
            // </form>
        );
    }
}

export default withStyles(styles)(CustomersAdd);
// export default CustomersAdd;