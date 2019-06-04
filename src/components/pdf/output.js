import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Spinner from '../spinner';
import ReactJson from 'react-json-view';
import Error from '../error';
import Box from '@material-ui/core/Box';

import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import RightArrowIcon from '@material-ui/icons/ChevronRight';


import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class App extends Component{
  
  constructor(props) {
    super(props);
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
                                    <LeftArrowIcon onClick = {this.decrementPage}/>
                                        <span style={{verticalAlign: 'super'}}>Page {pageNumber} of {numPages} </span>
                                    <RightArrowIcon onClick={this.incrementPage}/>
                                    <div style={{display: "flex", alignItems: "center", paddingLeft: "22px"}}>
                                        <Document
                                            file={this.state.file}
                                            onLoadSuccess={this.onDocumentLoadSuccess}
                                        >
                                            <Page pageNumber={pageNumber}/>
                                        </Document>
                                    </div>
                                    <LeftArrowIcon onClick = {this.decrementPage}/>
                                        <span style={{verticalAlign: 'super'}}>Page {pageNumber} of {numPages} </span>
                                    <RightArrowIcon onClick={this.incrementPage}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} style={{padding: '3px'}}>
                                <Paper style={{ backgroundColor: "black", overflowY: "scroll", height: '78vh', alignItems: 'center'}}>
                                    <div style={{textAlign: "left", paddingLeft: "20px", paddingRight: "20px", paddingTop: "30px", paddingBottom: "30px"}}>
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
