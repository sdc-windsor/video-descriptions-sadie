import React from 'react';
import axios from 'axios';
import { userThumbNail } from '../styles';
import { Button } from 'reactstrap';

const description_url = 'http://ec2-34-211-59-0.us-west-2.compute.amazonaws.com:3003';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: 'Comment',
            info: ''
        }
    }

    getUserInfo(user_id) {
        axios.get(`${description_url}/usersthumbnail/${user_id}`).then((data) => {
            this.setState({
                info: data.data
            })
        })
    }

    componentDidMount() {
        this.getUserInfo('3');
    }

    render() {
        return (
            <div style={{ borderTop: '0.05em solid #e8eaed', borderBottom: '0.05em solid #e8eaed', paddingTop: '1em', paddingBottom: '1em', display: 'flex' }}>
                <div>
                    <img src={this.state.info.user_thumbnail} style={userThumbNail} />
                </div>
                <div style={{ paddingLeft: '2em', flex: 'auto' }}>
                    <div>Add a new Comment</div>
                    <textarea style={{ width: '100%', height: '5em' }} value={this.props.comment} onChange={(event) => { this.props.updateInput(event.target.value) }}></textarea>
                    <div><Button color="info" style={{ padding: "5px" }}
                        onClick={() => {
                            let id = window.location.pathname;
                            id = id.split('/');
                            this.props.sendComment(Number(id[1]));
                        }}
                    >Add Comment</Button>{' '}</div>
                </div>
            </div>
        )
    }
}

export default AddComment;