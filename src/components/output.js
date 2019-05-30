import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Spinner from './spinner'

export default class App extends Component{
  
  constructor(props) {
    super(props);
    this.state ={
        file: this.props.file,
        processing: this.props.processing,
        data: {}
    };
  }

  componentDidMount() {
      debugger;
    const formData = new FormData();
    formData.append('file',this.state.file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*" 
        }
    };
    axios.post("", formData, config)
    .then((response) => {
        debugger;
        this.setState({
            data: response,
            processing: false
        })
    }).catch((error) => {
        alert("Error");
    })
  }

  render() {
    switch(this.state.processing){
        case true:
            return <Spinner/>;
        case false:
            return (  
            <div id= "form">
              <Grid container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '65vh'}}>
                <Grid container style={{ paddingLeft: '75vh'}}>
                  <Grid item>
                    <Paper style={{backgroundColor: 'black', opacity: '0.8'}} id= "acord">
                      <Typography variant="subtitle2" component="h3" style={{color:"white"}} id= "acord">

                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper style={{backgroundColor: 'black', opacity: '0.8'}} id= "acord">
                      <Typography variant="subtitle2" component="h3" style={{color:"white"}} id= "acord">

                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          ); 
    }
    
  }
}




