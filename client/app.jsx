import "@babel/polyfill";
import React from 'react';
import descriptions from '../videoData_json';
import Title from './components/Title.jsx';
import axios from 'axios';
import IconTab from './components/IconTab.jsx';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorImg: '',
        }
        this.getAuthorImg = this.getAuthorImg.bind(this);
    }

    getAuthorImg(name,cb) {
        axios.get(`http://localhost:8080/usersthumbnail/${name}`).then((data)=>{cb(data)});
    }

    componentDidMount() {
        this.getAuthorImg(descriptions[0].author,(data)=>{
            this.setState({
                authorImg: data.data.user_thumbnail
            })
        });
    }

    render() {
        return (
            <div>
                <Title data={descriptions[0]}
                       authorImg={this.state.authorImg}
                />
                <IconTab data={descriptions[0]}/>
            </div>
        )
    }
}

export default App;