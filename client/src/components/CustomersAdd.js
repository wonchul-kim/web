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
        this.state = { // 모든 정보에 대한 초기화
            file: null, // profile image로서 byte 형태의 데이터 
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' // 보내고자 하는 file(여기서는 profile image)의 이미지 이름
        }
        // window.location.reload(); // 시험적으로 해당 window를 그냥 새로고침
        // // 이는 필요한 부분만 새로고침하도록 고치자!!
        

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