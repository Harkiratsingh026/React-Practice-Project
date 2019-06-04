import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
  }

  render() {
    switch(this.state.processing){
      case true:
          return <Output label= {this.props.label} file= {this.state.file} processing= {this.state.processing} url={this.props.url}/>;
      case false:
          return (  
            <div id= "form">
              <Grid container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '85vh'}}>
                <Grid container style={{ paddingLeft: '20px', display: 'contents'}}>
                  <Grid item>
                    <Paper style={{backgroundColor: 'black', opacity: '0.8'}} id= "acord">
                      <Typography variant="subtitle2" component="h3" style={{color:"white"}} id= "acord">
                        <form onSubmit={this.onFormSubmit} style={{padding:'10px'}}>
                          <button type="submit">Extract Email</button>
                        </form>
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
