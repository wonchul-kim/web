import React, { Component } from 'react';
import { post } from 'axios';


class CustomersAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { // 모든 정보에 대한 초기화
            file: null, // profile image로서 byte 형태의 데이터 
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' // 보내고자 하는 file(여기서는 profile image)의 이미지 이름
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
            })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], // file을 하나씩 업로드하기 위해서는 index를 정해준다.
            fileName: e.target.value,
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
         
    }

    addCustomer = () => { // 작성한 form의 정보들을 server로 보내주는 함수 
        const url = '/api/customers';
        const formData = new FormData();
        formData('image', this.state.file);
        formData('name', this.state.userName);
        formData('birthday', this.state.birthday);
        formData('gender', this.state.gender);
        formData('job', this.state.job);

        // file이 포함되어 있는 데이터를 전송하고자 할 때에는 map 표준에 맞는 header를 추가해주어야 한다. 

        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }

        }

        return post(url, formData, config);

         
    }

    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1> 고객 추가 </h1>
                {/* // 어떤 값들을 server로 보내줄지 지정하기 위해서는 input tag를 이용한다. */}
                {/* // 이 때, 해당 변수들의 각각의 상태변화를 감지하기 위해서 onChange 함수가 사용된다.  */}
                프로파일 이미지: <input type='file' name='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> <br />
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br />
                생년월일: <input type='text' name='birthday' value={this.state.birthday} onChange={this.handleValueChange} /> <br />  
                성별: <input type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange} /> <br />  
                직업: <input type='text' name='job' value={this.state.job} onChange={this.handleValueChange} /> <br />  

                {/* // 이 버튼을 누르면 자동으로 handleformsubmit 함수가 호출된다.  */}
                <button type="submit"> 추가하기 </button> 
                
            </form>
        );
    }
}

export default CustomersAdd;