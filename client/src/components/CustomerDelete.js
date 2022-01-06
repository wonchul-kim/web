import React from 'react';

class CustomerDelete extends React.Component{
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
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}> 삭제 </button>
        );
    }
}

export default CustomerDelete;