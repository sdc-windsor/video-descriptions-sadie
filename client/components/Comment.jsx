import React from 'react';
import axios from 'axios';
import {userThumbNail} from '../styles';
import {distanceInWordsStrict} from 'date-fns';

const description_url = 'http://ec2-54-187-177-192.us-west-2.compute.amazonaws.com',
class Comment extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            info: {},
            timeDifference:''
        }
    }

    getUserInfo(user_id) {
        axios.get(`${description_url}/usersthumbnail/${user_id}`).then((data)=>{
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
            <div style={{  borderTop: '0.05em solid #e8eaed', borderBottom: '0.05em solid #e8eaed', paddingTop: '1em', paddingBottom: '1em'}}>
                <img src={this.state.info.user_thumbnail} style={userThumbNail} />
                <div style={{display: 'inline', padding:'1em', fontWeight: 'bold'}}>{this.state.info.username}</div>
                <div style={{display: 'inline', padding:'1em'}}>{this.state.timeDifference}</div>
                <div style={{padding:'1em'}}>{this.props.userInfo.comment}</div>

            </div>
        )
    }
}

export default Comment;