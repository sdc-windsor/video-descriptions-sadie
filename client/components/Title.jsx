import React from 'react';
import {userThumbNail} from '../styles';
import { Button } from 'reactstrap';
import {title} from '../styles';


const Title = function(props) {
    return(
        <div>
            <h1 style={title}>{props.data.title}</h1>
            <div>
                <div style={{display:'inline'}}>6 years ago || </div>
                <div style={{display:'inline'}}>More</div>
            </div>
            &nbsp;
            <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center',height: '39px'}}>
                <img src={props.authorImg} style={userThumbNail}/>
                <h3 style={{display:"inline", padding: "5px",fontSize:'.875rem'}}>{props.data.author}</h3>
                <Button color="info" style={{display:"inline" , padding: "5px"}}>+ Follow</Button>{' '}
            </div>
        </div>
    )
}

export default Title;