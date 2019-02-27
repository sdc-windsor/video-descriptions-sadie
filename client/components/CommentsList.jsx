import React from 'react';
import axios from 'axios';
import Comment from './Comment.jsx';

export default class CommentsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            newDisplay: [],
            currentInd:0,
            numOfChildren: 5,
        }
    }

    getComments(video_id) {
        axios.get(`http://localhost:8081/comments/${video_id}`).then((data)=>{
            if (data.data.length > this.state.comments.length) {
                this.setState({
                    comments: data.data.map((ele)=>{
                        return ele.comment
                    })
                })
            }
        })
    }

    commentToShow(currentIndex, nextWave) {
        console.log('currentIndex', currentIndex, nextWave);
        let com = this.state.comments.slice(currentIndex, nextWave);
        console.log(com);
        this.setState({
            newDisplay: com,
            currentInd: currentIndex+=5,
            numOfChildren: this.state.numOfChildren+=5
        })
        console.log(this.state.newDisplay)
    }

    componentDidMount() {
        this.getComments(2);
    }

    render() {
        const children = [];
        for (let i = 0; i < this.state.numOfChildren; i++) {
            children.push(<Comment key={i} comment={this.state.comments}/>)
        }

        return (
            <div>
                <button onClick={()=>{this.commentToShow(this.state.currentInd,this.state.currentInd+5)}}>Show more</button>
                {/* <h3>{
                    this.state.comments.map((data,index=0)=>(
                        <div key={index+=1} style={{borderColor:"black", borderStyle: 'solid'}}>
                            {data}
                        </div>
                    ))
                }</h3> */}
                {
                    children
                }
            </div>
        )
    }
}