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
			currentInd: 0,
			numOfChildren: 5,
			commentToSend: 'Comment'
		}
		this.sendComment = this.sendComment.bind(this);
		this.getComments = this.getComments.bind(this);
		this.updateInput = this.updateInput.bind(this);
	}

	getComments(video_id) {
		axios.get(`http://localhost:3003/comments/${video_id}`)
			.then((data) => {
				this.setState({
					userInfo: data.data.map((ele) => { return ele })
				})
			})
	}

	sendComment(video_id) {
		let data = {
			video_id: video_id,
			user_id: '3',
			comment: this.state.commentToSend,
			date: new Date(),
			func: () => {
				console.log('Sent comment to server')
			}
		}

		axios.post(`http://localhost:3003/comments/`, data)
			.then(() => {
				this.setState({ commentToSend: 'Comment' });
				this.getComments(data.video_id);
			})
	}

	updateInput(e) {
		this.setState({
			commentToSend: e
		})
	}

	componentDidMount() {
		let id = window.location.pathname;
		id = id.split('/');
		this.getComments(Number(id[1]));
	}

	render() {
		return (
			<div style={{ marginTop: '2em' }}>
				{
					this.state.userInfo.map((ele, i) => {
						return <Comment key={i} userInfo={ele} />
					})
				}
				<AddComment data={descriptions[0]}
					sendComment={this.sendComment}
					comment={this.state.commentToSend}
					updateInput={this.updateInput} />
			</div>
		)
	}
}