import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Output from './output'

export default class App extends Component{
  
  constructor(props) {
    super(props);
    this.state ={
        file: null,
        processing: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e){
    e.preventDefault();
    this.setState({
      processing: true
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]});
    debugger;
  }

  render() {
    switch(this.state.processing){
      case true:
          return <Output file= {this.state.file} processing= {this.state.processing}/>;
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
                        <form onSubmit={this.onFormSubmit} style={{padding:'10px'}}>
                          <AssignmentIcon style={{ color: 'white' }} id= "acord"/><h3>File Upload</h3>
                          <input type="file" name="myImage" onChange= {this.onChange} />
                          <button type="submit">Upload</button>
                        </form>
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            // <div>
            //   <Grid container spacing={3}>
            //     <Grid item xs={12}>
            //       <Card>
            //         <CardHeader >
            //           Upload PDF File 
            //         </CardHeader>
            //         <CardContent>
            //         <form onSubmit={this.onFormSubmit}>
            //             <h1>File Upload</h1>
            //             <input type="file" name="myImage" onChange= {this.onChange} />
            //             <button type="submit">Upload</button>
            //         </form>
            //         </CardContent>
            //       </Card>
            //     </Grid>
            //     <Grid item xs={6}>
            //       <Card>
            //         <CardHeader>
            //           Image 
            //         </CardHeader>
            //         <CardContent>
            //           Image Content
            //         </CardContent>
            //       </Card>
            //     </Grid>
            //     <Grid item xs={6}>
            //       <Card>
            //         <CardHeader>
            //           Upload PDF File 
            //         </CardHeader>
            //         <CardContent>
            //           JSON Content
            //         </CardContent>
            //       </Card>
            //     </Grid>
            //   </Grid>
            // </div>
          ); 
    }
    
  }
}




