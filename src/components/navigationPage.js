import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import EmailIcon from '@material-ui/icons/Email';

import Logo from '../images/logo_white.png';
import bg from '../images/bg.jpg';
import Pdf from './pdf/input';
import Email from './email/input';
import Image from './image/input';


var obj = {'Acord': 'Assignment', 'SLIP/MRC': 'Receipt', 'Image Extraction': 'ImageSearch', 'Email Body Extraction': 'Email'};

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

const StyledTab = styled(Tabs)`
    background: linear-gradient(45deg, #0c0e1e 30%, #2b62a4 100%);
  `;


export default class NavigationPage extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      value: this.props.selectedTab
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.selectedTab});
  }

  handleChange(event, newValue) {
    switch(newValue){
      case 'homepage':
        this.props.onClick();
      default:
        this.setState({
          value: newValue
        })
    }
  }

  render(){  
    return (
      <div >
        <div>
          <CssBaseline />
          <AppBar position="static" color="default">
            
            <StyledTab
              value={this.state.value}
              onChange={this.handleChange}
            >
              <img style={{marginLeft:15, marginTop: 5, marginBottom: 5}} value= "homepage" id= "homepage" onClick={this.props.onClick} src={Logo} alt="Logo"/>
              <Tab style={{marginLeft:25}} value= "acord" centered={true} label={<span style={{ color: 'white'}}>{'Acord'}</span>} icon={<AssignmentIcon style={{ color: 'white' }}/>} />
              <Tab style={{marginLeft:10}} value= "email" centered={true} label={<span style={{ color: 'white' }}>{'Email Body Extraction'}</span>} icon={<EmailIcon style={{ color: 'white' }}/>} />
              <Tab style={{marginLeft:10}} value= "image" centered={true} label={<span style={{ color: 'white' }}>{'Image Extraction'}</span>} icon={<ImageSearchIcon style={{ color: 'white' }}/>} />
              <Tab style={{marginLeft:10}} value= "slip" centered={true} label={<span style={{ color: 'white' }}>{'SLIP/MRC'} </span>} icon={<ReceiptIcon style={{ color: 'white' }}/>} />
            </StyledTab>
          </AppBar>
            <div style={{ backgroundImage: `url(${bg})`,  backgroundPosition: 'center', backgroundSize: 'cover', height: "85vh"}}>
              {this.state.value === 0 && <TabContainer>Home</TabContainer>}        
              {this.state.value === 'acord' && <TabContainer>< Pdf url={"http://52.175.213.123:8080/acord/pdf"} label= {"Accord"}/></TabContainer>}
              {this.state.value === 'slip' && <TabContainer>< Pdf url={"http://52.175.213.123:9090/pdf/uploadSLIP"} label= {"SLIP/MRC"} /></TabContainer>}
              {this.state.value === 'image' && <TabContainer><Image url={"http://52.175.213.123:6060/ttc/upload"} label= {"Image"}/></TabContainer>}
              {this.state.value === 'email' && <TabContainer>< Email url={"http://52.175.213.123:7070/extractemail"} label= {"Email"} /></TabContainer>}
            </div>
        </div>
      </div>
    );
  }
}

 
