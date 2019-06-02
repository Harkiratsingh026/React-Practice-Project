import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Spinner from '../spinner'
import test from '../../images/test.pdf';

import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import RightArrowIcon from '@material-ui/icons/ChevronRight';


import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class App extends Component{
  
  constructor(props) {
    super(props);
    this.state ={
        // file: this.props.file,
        processing: this.props.processing,
        pageNumber: 1,
        numPages: 2,
        // data: {}
    };
    this.onError = this.onError.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
  }

  // componentDidMount() {
  //     debugger;
  //   const formData = new FormData();
  //   formData.append('file',this.state.file);
  //   const config = {
  //       headers: {
  //           'content-type': 'multipart/form-data',
  //           'Access-Control-Allow-Origin': "*" 
  //       }
  //   };
  //   axios.post("", formData, config)
  //   .then((response) => {
  //       debugger;
  //       this.setState({
  //           data: response,
  //           processing: false
  //       })
  //   }).catch((error) => {
  //       alert("Error");
  //   })
  // }
  onError(e) {
    console.log('Error');
  }

  incrementPage(){
    if(this.state.pageNumber < this.state.numPages){
      this.setState({
        pageNumber: this.state.pageNumber + 1
      })
    }
  }

  decrementPage(){
    if(this.state.pageNumber > 1){
      this.setState({
        pageNumber: this.state.pageNumber - 1
      })
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;

    switch(this.state.processing){
        case true:
            return <Spinner />;
        case false:
            return (  
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <Paper style={{ backgroundColor: "grey", overflowY: "scroll", height: '82vh'}}>
                      <div>
                        <LeftArrowIcon onClick = {this.decrementPage}/>
                        <span style={{verticalAlign: 'super'}}>Page {pageNumber} of {numPages} </span>
                        <RightArrowIcon onClick={this.incrementPage}/>
                      </div>
                      <div style={{paddingLeft: '25px'}}>
                        <Document
                          file={test}
                          onLoadSuccess={this.onDocumentLoadSuccess}
                        >
                          <Page pageNumber={pageNumber}/>
                        </Document>
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper>xs=6</Paper>
                  </Grid>
                </Grid>
                
                
              </div>
          ); 
    }
    
  }
}




