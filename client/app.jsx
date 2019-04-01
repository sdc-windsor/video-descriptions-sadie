import "@babel/polyfill";
import React from 'react';
import descriptions from '../videoData_json';
import Title from './components/Title.jsx';
import axios from 'axios';
import IconTab from './components/IconTab.jsx';
import LineDivider from './components/LineDivider.jsx';
import DetailCom from './components/DetailCom.jsx';
import CommentsList from './components/CommentsList.jsx';
import { Date } from "core-js";

const description_url = 'http://localhost:3003';
const video_url = 'http://localhost:3001';

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

    getAuthorImg(name, cb) {
        axios.get(`${description_url}/userid/${name}`).then((data) => {
            axios.get(`${description_url}/usersthumbnail/${data.data}`).then((data) => { cb(data) })
        })
    }

    getDetail(video_id) {
        axios.get(`${description_url}/details/${video_id}`).then((data) => {
            console.log(data)
            this.setState({
                details: data.data.description
            });
        });
    }

    getCategories(video_id) {
        axios.get(`${description_url}/categories/${video_id}`).then((data) => {
            this.setState({
                categories: data.data.categories
            });
        }).catch((err) => { console.log(err) });
    }

    componentDidMount() {
        let id = window.location.pathname; //  '/5/'
        id = id.split('/');
        axios.get(`${video_url}/videos/${Number(id[1])}`).then((data) => {
            this.setState({
                data: data.data[0]
            }),
                this.getAuthorImg(data.data[0].author, (data) => {
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
            <div style={{ paddingLeft: '2.5rem', paddingTop: '2.5rem', float: 'left' }}>
                <Title data={this.state.data}
                    authorImg={this.state.authorImg}
                />
                <LineDivider />
                <IconTab data={descriptions[0]} />
                <DetailCom data={this.state.details}
                    categories={this.state.categories}
                />
                &nbsp;
                <LineDivider />
                &nbsp;
                <CommentsList />
            </div>
        )
    }
}

export default App;