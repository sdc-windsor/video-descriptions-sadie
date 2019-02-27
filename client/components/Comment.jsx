import React from 'react';
import axios from 'axios';
import {userThumbNail} from '../styles';
import {distanceInWordsStrict} from 'date-fns';

class Comment extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            info: {},
            timeDifference:''
        }
    }

    getUserInfo(user_id) {
        axios.get(`http://localhost:8081/usersthumbnail/${user_id}`).then((data)=>{
            console.log(data);
            this.setState({
                info: data.data
            })
        })
    }

    getTimeDifference(date) {
        this.setState({
            timeDifference: distanceInWordsStrict(new Date(), date, { addSuffix: true })
        })
    }

    componentDidMount() {
        this.getUserInfo(this.props.userInfo.user_id);
        this.getTimeDifference(this.props.userInfo.date)
    }

    render() {
        return (
            <div>
                <img src={this.state.info.user_thumbnail} style={userThumbNail} />
                <div style={{display: 'inline', padding:'1em'}}>{this.state.info.username}</div>
                <div style={{display: 'inline', padding:'1em'}}>{this.state.timeDifference}</div>
                <div style={{padding:'1em'}}>{this.props.userInfo.comment}</div>

            </div>
        )
    }
}

export default Comment;