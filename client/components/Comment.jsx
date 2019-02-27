import React from 'react';
import axios from 'axios';
import {userThumbNail} from '../styles';

const Comment = (props) =>{
    return (

        <div>
            {console.log(props.userInfo)}
            <img src={props.userInfo.user_thumbnail} style={userThumbNail}/>
            {props.userInfo.comment}
            {props.userInfo.date}
        </div>
    )
}

export default Comment;