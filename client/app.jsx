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
            categories: []
        }
        this.getAuthorImg = this.getAuthorImg.bind(this);
    }

    getAuthorImg(name,cb) {
        axios.get(`http://localhost:8081/usersthumbnail/${name}`).then((data)=>{cb(data)});
    }

    getDetail(video_id) {
        axios.get(`http://localhost:8081/details/${video_id}`).then((data)=>{
            this.setState({
                details: data.data[0].description
            });
        });
    }

    getCategories(video_id) {
        axios.get(`http://localhost:8081/categories/${video_id}`).then((data)=>{
            this.setState({
                categories: data.data.categories
            });
        });
    }

    componentDidMount() {
        this.getAuthorImg('5c765bac17026a2044555c3e',(data)=>{
            this.setState({
                authorImg: data.data.user_thumbnail
            })
        });
        this.getDetail(2);
        this.getCategories(2);
    }

    render() {
        return (
            <div style={{width: '65%', paddingRight: '2.5rem', paddingLeft: '2.5rem', paddingTop: '2.5rem'}}>
                <Title data={descriptions[0]}
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