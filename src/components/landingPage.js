import React, {Component} from 'react';
import HomePage from './homepage';
import NavigationPage from './navigationPage';
 
export default class LandingPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab: "homepage",
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.setState({
            selectedTab: e.target.id 
        },() => {
            console.log("Route Changed");
        });
        console.log(this.state);
    }

    render(){
        switch(this.state.selectedTab) {
            case 'homepage':
                return  <HomePage selectedTab= {this.state.selectedTab} onClick={this.handleClick.bind(this)}/>;
            case 'acord':
                return  <NavigationPage selectedTab= {this.state.selectedTab} onClick={this.handleClick.bind(this)}/>;
            case 'slip':
                return  <NavigationPage selectedTab= {this.state.selectedTab} onClick={this.handleClick.bind(this)}/>;
            case 'image':
                return  <NavigationPage selectedTab= {this.state.selectedTab} onClick={this.handleClick.bind(this)}/>;
            case 'email':
                return  <NavigationPage selectedTab= {this.state.selectedTab} onClick={this.handleClick.bind(this)}/>;
            default:
                return  <HomePage selectedTab= {this.state.selectedTab} onClick={this.handleClick.bind(this)}/>;
          }
    }
}

