import "@babel/polyfill";
import React from 'react';
import descriptions from '../videoData_json';
import Title from './components/Title.jsx';
import axios from 'axios';
import IconTab from './components/IconTab.jsx';
import LineDivider from './components/LineDivider.jsx';
import DetailCom from './components/DetailCom.jsx';
import CommentsList from './components/CommentsList.jsx';
import AddComment from "./components/AddComment.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorImg: '',
            details: '',
            categories: [],
            data: {}
        }
        this.getAuthorImg = this.getAuthorImg.bind(this);
    }

    getAuthorImg(name,cb) {
        axios.get(`http://localhost:4003/userid/${name}`).then((data)=>{
            axios.get(`http://localhost:4003/usersthumbnail/${data.data}`).then((data)=>{cb(data)})
        })
    }

    getDetail(video_id) {
        axios.get(`http://localhost:4003/details/${video_id}`).then((data)=>{
            console.log("service data", data)
            this.setState({
                details: data.data[0].description
            });
        });
    }

    getCategories(video_id) {
        axios.get(`http://localhost:4003/categories/${video_id}`).then((data)=>{
            this.setState({
                categories: data.data.categories
            });
        }).catch((err)=>{console.log(err)});
    }

    componentDidMount() {
        let id = window.location.pathname;
        id = id.split('/');
        axios.get(`http://localhost:4003/videos/${Number(id[1])}`).then((data)=>{
            this.setState({
                data: data.data
            }),
            this.getAuthorImg(data.data.author,(data)=>{
                this.setState({
                    authorImg: data.data.user_thumbnail
                })
            });
        })
        this.getDetail(Number(id[1]));
        this.getCategories(Number(id[1]));
    }

    render() {
        return (
            <div style={{paddingLeft: '2.5rem', paddingTop: '2.5rem', float: 'left'}}>
                <Title data={this.state.data}
                       authorImg={this.state.authorImg}
                />
                <LineDivider />
                <IconTab data={descriptions[0]}/>
                <DetailCom data={this.state.details}
                           categories={this.state.categories}
                />
                &nbsp;
                <LineDivider />
                &nbsp;
                <CommentsList />
                {/* <AddComment data={descriptions[0]}/> */}
            </div>
        )
    }
}

export default App;