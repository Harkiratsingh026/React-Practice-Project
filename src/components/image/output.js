import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Spinner from '../spinner';
import ReactJson from 'react-json-view';
import Error from '../error';
import Box from '@material-ui/core/Box';
import test from '../../images/bg.jpg'
import ReactImageMagnify from 'react-image-magnify';
import ReactSlick from 'react-slick';

export default class App extends Component{
  
  constructor(props) {
    super(props);
    debugger;
    this.state ={
        file: this.props.file,
        processing: this.props.processing,
        pageNumber: 1,
        numPages: 2,
        data: {},
        errorMessage:'',
    };
    this.onError = this.onError.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  componentDidMount() {
    const formData = new FormData();
    formData.append('file',this.state.file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*" 
        }
    };
    axios.post(this.props.url, formData, config)
    .then((response) => {
        this.setState({
            data: response.data,
            processing: false
        })
    }).catch((error) => {
        this.setState({
            processing: null,
            errorMessage: error.message
        })
        console.log("Error----:", error);
    })
  }

  onDocumentLoadSuccess(e){
        this.setState({
            numPages: e._pdfInfo.numPages
        })
    }

  onError(e) {
    console.log('Error');
  }

  incrementPage(e){
    if(this.state.pageNumber < this.state.numPages){
      this.setState({
        pageNumber: this.state.pageNumber + 1
      })
    }else{
        this.setState({
            pageNumber: 1
        })  
    }
  }

  decrementPage(e){
    if(this.state.pageNumber > 1){
      this.setState({
        pageNumber: this.state.pageNumber - 1
      })
    }else{
        this.setState({
            pageNumber: this.state.numPages
        })  
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;
    let rimProps = {
        isHintEnabled: true,
        shouldHideHintAfterFirstActivation: false,
        enlargedImagePosition: 'over'
    }
    switch(this.state.processing){
        case true:
            return(
                <div>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Spinner />
                </div>
            ); 
        case false:
            return (
                <div style={{padding: '10px', paddingTop: "15px"}}>
                    <Box borderRadius="borderRadius" clone border={5} borderColor="rgb(240, 240, 240)" style={{backgroundColor: "rgb(240, 240, 240)"}}>
                        <Grid container style={{backgroundColor: "rgb(240, 240, 240)"}}>
                            <Grid item xs={6} style={{padding: '3px'}}>
                                <Paper style={{ backgroundColor: "grey", overflowY: "scroll", height: '78vh'}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <ReactImageMagnify
                                            {...{
                                                smallImage: {
                                                    src: this.props.fileUrl,
                                                    width: 620,
                                                    height: 600
                                                },
                                                largeImage: {
                                                    src: this.props.fileUrl,
                                                    width: 1200,
                                                    height: 1800
                                                },
                                                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                                                }}
                                                {...rimProps}
                                            />                      
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} style={{padding: '3px'}}>
                                <Paper style={{ backgroundColor: "black", overflowY: "scroll", height: '78vh', alignItems: 'center'}}>
                                    <div style={{textAlign: "left"}}>
                                        <ReactJson style={{backgroundColor: "black"}} src={this.state.data} name={this.props.label} theme="bright" collapsed={false}
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