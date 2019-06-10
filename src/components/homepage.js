import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import EmailIcon from '@material-ui/icons/Email';

import Logo from '../images/logo_white.png';
import bg from '../images/bg.jpg';

const StyledTab = styled(Tabs)`
    background: linear-gradient(45deg, #0c0e1e 30%, #2b62a4 100%);
  `;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default class HomePage extends Component {

  constructor(props){
    super(props);
    this.classes = props;
    this.state = {
      value: 'homepage'
    }
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.selectedTab});
  }

  handleMouseOver(e) {
    e.target.parentElement.style.opacity = 0.8;
  }

  handleMouseOut(e) {
    e.target.parentElement.style.opacity = 0.6;
  }

  render(){
    return (
      <div>
          <AppBar position="static" color="default">
            <StyledTab
              value={this.state.value}
              onClick={this.props.onClick}
            >
              <img style={{ marginLeft:15, marginTop: 5, marginBottom: 5}} value='homepage' id="homepage" src={Logo} alt="Logo"/>
            </StyledTab>
          </AppBar>
          <div style={{ backgroundImage: `url(${bg})`,  backgroundPosition: 'center', backgroundSize: 'cover', height: "82vh"}}>
            {this.state.value === 'homepage' && <TabContainer>
              <div className={this.classes.root}>
                <Grid container
                      direction="column"
                      alignItems="center"
                      justify="center"
                      style={{ minHeight: '85vh'}}>
                  <Grid container item xs={12} spacing={10} style={{paddingBottom: '4vh'}}>
                    <Grid item xs={6} style={{paddingLeft: '22vh', paddingRight: '3vh'}}>
                      <Paper style={{backgroundColor: 'black', opacity: '0.6'}} id= "acord" onMouseOver={this.handleMouseOver} 
                        onMouseOut= {this.handleMouseOut} onClick={this.props.onClick}>
                        <Typography variant="subtitle2" component="h3" style={{color:"white"}} id= "acord">
                          <AssignmentIcon style={{ color: 'white' }} id= "acord"/>
                        </Typography>
                        <Typography variant="subtitle2" component="h3" style={{color:"white"}} id= "acord">
                          Accord
                        </Typography>
                        <Typography component="p" variant="caption" style={{color:"white", padding:'2px'}} id= "acord">
                          Extraction of general information from Commercial Insurance Application which follows standard 
                          Acord format. Information extracted includes Insured Name & Insured Segment, Broker details, 
                          Premium information, Prior Premium & Carrier details, Exposure information etc.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} style={{paddingRight: '22vh', paddingLeft: '3vh'}}>
                      <Paper style={{backgroundColor: 'black', opacity: '0.6'}} id="email" onMouseOver={this.handleMouseOver} 
                        onMouseOut= {this.handleMouseOut}  onClick={this.props.onClick}>
                        <Typography variant="subtitle2" component="h3" id="email" style={{color:"white"}}>
                          <EmailIcon style={{ color: 'white' }} id="email"/>
                        </Typography>
                        <Typography variant="subtitle2" component="h3" id="email" style={{color:"white"}}>
                          Email Body Extraction
                        </Typography>
                        <Typography component="p" variant="caption" id="email" style={{color:"white", padding:'2px'}}>
                          Showcase of insurance content extraction from unstructured and free flowing 
                          email body text that helps underwriters to consolidate information for 
                          easier risk evaluation. Email content read from a pre-defined email address and 
                          extracted content shown as JSON for representation.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} spacing={10}style={{paddingBottom: '3vh'}}>
                    <Grid item xs={6} style={{paddingLeft: '22vh', paddingRight: '3vh'}}>
                      <Paper style={{backgroundColor: 'black', opacity: '0.6'}} id="image" onMouseOver={this.handleMouseOver} 
                        onMouseOut= {this.handleMouseOut}  onClick={this.props.onClick}>
                        <Typography variant="subtitle2" component="h3" id="image" style={{color:"white"}}>
                          <ImageSearchIcon style={{ color: 'white' }} id="image"/>
                        </Typography>
                        <Typography variant="subtitle2" component="h3" id="image" style={{color:"white"}}>
                          Image Extraction 
                        </Typography>
                        <Typography component="p" variant="caption" id="image" style={{color:"white", padding:'2px'}}>
                          Straight Through Processing(STP) of User feedback forms which includes a combination of  
                          manual markings, printed Labels and handwritten content using SLICE. 
                          Extracted content shown as JSON for representation.<br/><br/>
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} style={{paddingRight: '22vh', paddingLeft: '3vh'}}>
                      <Paper style={{backgroundColor: 'black', opacity: '0.6'}} id="slip" onMouseOver={this.handleMouseOver} 
                        onMouseOut= {this.handleMouseOut}  onClick={this.props.onClick}>
                        <Typography variant="subtitle2" component="h3" id="slip" style={{color:"white"}}>
                          <ReceiptIcon style={{ color: 'white' }} id="slip"/>
                        </Typography>
                        <Typography variant="subtitle2" component="h3" id="slip" style={{color:"white"}}>
                          SLIP/MRC
                        </Typography>
                        <Typography component="p" variant="caption" id="slip" style={{color:"white", padding:'2px'}}>
                          Extraction of general information from SLIP/MRC documents that helps  the underwriters 
                          to consolidate information from semi-structured documents for easier risk evaluation. 
                          Extracted content shown as JSON for representation.<br/><br/>
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </TabContainer>}       
          </div>
      </div>
    )
  }
}



