import React, { Component } from 'react';
import { post } from 'axios';

class CustomersAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }
}