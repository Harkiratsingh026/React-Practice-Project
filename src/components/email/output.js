import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Spinner from '../spinner';
import ReactJson from 'react-json-view';
import Error from '../error';
import Box from '@material-ui/core/Box';

export default class App extends Component{
  
  constructor(props) {
    super(props);
    this.state ={
        processing: this.props.processing,
        pageNumber: 1,
        numPages: 2,
        data: {},
        errorMessage:'',
        htmlMailData: ''
    };
    this.htmlDecode = this.htmlDecode.bind(this);
  }

  componentDidMount() {
    const formData = new FormData();
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*" 
        }
    };
    axios.get(this.props.url, formData, config)
    .then((response) => {
        this.setState({
            htmlMailData: response.data.Html,
            data: response.data.jsonoutput,
            processing: false
        },()=>{
            console.log(this.state);
        })
    }).catch((error) => {
        this.setState({
            processing: null,
            errorMessage: error.message
        })
        console.log("Error----:", error);
    })
  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  render() {
    switch(this.state.processing){
        case true:
            return(
                <div>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Spinner />
                </div>); 
        case false:
            return (
                <div style={{padding: '10px', paddingTop: "15px"}}>
                    <Box borderRadius={12} clone border={5} borderColor="rgb(240, 240, 240)" style={{backgroundColor: "rgb(240, 240, 240)"}}>
                        <Grid container style={{backgroundColor: "rgb(240, 240, 240)"}}>
                        <Grid item xs={6} style={{padding: '3px'}}>
                            <Paper style={{overflowY: "scroll", height: '80vh'}}>
                                <div style={{display:  "inline", paddingLeft: "22px", textAlign: "left"}}>
                                    { this.state.htmlMailData.split('\n').map((item, i) => {
                                        return <p key={i}>{item}</p>;
                                    })}
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} style={{padding: '3px'}}>
                            <Paper style={{ backgroundColor: "black", overflowY: "scroll", height: '80vh', alignItems: 'center'}}>
                                <div style={{textAlign: "left"}}>
                                    <ReactJson src={this.state.data} name={this.props.label} theme="bright" collapsed={false}
                                        displayDataTypes={false} sortKeys={true}  displayObjectSize={false}
                                    />
                                </div>
                            </Paper>
                        </Grid>
                        </Grid>
                    </Box>
                </div>
          );
        default: 
            return (
                < Error message= {this.state.errorMessage}/>
            );
    }
  }
}