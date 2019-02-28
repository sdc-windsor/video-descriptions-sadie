import React from 'react';
import axios from 'axios';
import Comment from './Comment.jsx';
import AddComment from './AddComment.jsx';
import descriptions from '../../videoData_json';

export default class CommentsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: [],
            commentList: [],
            newDisplay: [],
            currentInd:0,
            numOfChildren: 5,
            commentToSend: 'Comment'
        }
        this.sendComment = this.sendComment.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    getComments(video_id) {
        axios.get(`http://localhost:8081/comments/${video_id}`).then((data)=>{
            console.log(data.data)
                this.setState({
                    userInfo: data.data.map((ele)=>{
                        return ele
                    })
                })
        })
    }

    sendComment(video_id){
        let data = {
            video_id: video_id,
            user_id: '5c765bac17026a2044555c38',
            comment: this.state.commentToSend,
            date: new Date(),
            func: () => {
                console.log('Sent comment to server')
            }
        }

        axios.post(`http://localhost:8081/comments/${video_id}`, data).then(()=>{
            console.log('posted')
            this.setState({
                commentToSend: 'Comment'
            });
            this.getComments(2);
        })
    }

    updateInput(e) {
        this.setState({
            commentToSend: e
        })
    }

    componentDidMount() {
        this.getComments(2);
        console.log('state', this.state.userInfo)
    }

    render() {
        return (
            <div>
                {
                    this.state.userInfo.map((ele,i)=>{
                        return <Comment key={i} userInfo={ele} />
                    })
                }
                <AddComment data={descriptions[0]}
                            sendComment={this.sendComment}
                            comment={this.state.commentToSend}
                            updateInput = {this.updateInput} />
            </div>
        )
    }
}