import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import FacebookImg from './assets/social/facebook-white.svg';
import TwitterImg from './assets/social/twitter-white.svg';
import InstagramImg from './assets/social/instagram-white.svg';

import AppImg from './assets/store/app-store.svg';
import PlayImg from './assets/store/play-store.svg';
import WindowsImg from './assets/store/windows-store.svg';

import PlaceHolderImg from './assets/placeholder.png';

import data from "./feed/sample.json";

data.entries = data.entries.sort((a, b)=> (a.title > b.title) ? 1 : -1) // Trier les streamings par ordre alphabétique

serviceWorker.unregister();


class Header extends React.Component { //Classe pour header
  render() {
    return (
    	<header>
    		<div id="main_title">
    			<h1>DEMO Streaming</h1>
  				<ul id="nav">
    				<li><a href="#">Log in</a></li>
    				<li><a href="#" id="free_trial">Start your free trial</a></li>
    			</ul>
   			 </div>
   			 <div id="title">
   			 	<h2>Popular {this.props.popular}</h2>
   			 </div>
    	</header>
    );
  }
}

class Footer extends React.Component { //Classe pour footer
  render() {
    return (
    	<footer>
    		<ul id="links">
    			<li>Home</li>
    			<li>|</li>
    			<li>Terms and Conditions</li>
    			<li>|</li>
    			<li>Privacy Policy</li>
    			<li>|</li>
    			<li>Collection Statement</li>
    			<li>|</li>
    			<li>Help</li>
    			<li>|</li>
    			<li>Manage Account</li>
   			 </ul>
   			 <p id="copyright">Copyright © 2016 DEMO Streaming. All Rights Reserved.</p>
   			 <div id="media">
   			 	<ul id="social">
    				<li><img src={FacebookImg} alt="Facebook" /></li>
    				<li><img src={TwitterImg} alt="Twitter" /></li>
    				<li><img src={InstagramImg} alt="Instagram" /></li>
   				 </ul>
   				 <ul id="store">
    				<li><img src={AppImg} alt="App store" /></li>
    				<li><img src={PlayImg} alt="Play store" /></li>
    				<li><img src={WindowsImg} alt="Windows store" /></li>
   				 </ul>
   			</div>
    	</footer>
    );
  }
}

class Accueil extends React.Component { //Classe pour l'accueil
  render() {
  	ReactDOM.render(<Header popular="Titles"/>, document.getElementById('header'));
    return (

    	<nav>
    		<div class="streaming">

    			<NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="series">
    				<div>
    					<p><img src={PlaceHolderImg} alt="Place holder" /></p>
    					<h2>series</h2>
    				</div>
    				<h3>Popular Series</h3>
    			</NavLink>
    		</div>

    		<div class="streaming">
    			<NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="movies">
    				<div>
    					<p><img src={PlaceHolderImg} alt="Place holder" /></p>
    					<h2>movies</h2>
    				</div>
    				<h3>Popular Movies</h3>
    			</NavLink>
    		</div>
    	</nav>
    );
  }
}




class Movies extends React.Component { //Classe pour les films
	state = { // Le Loading
		loading:true
	}

	componentWillMount(){
		setTimeout(() => {
			this.setState({loading:false})
		},1500);
	}

  	render() {
  		ReactDOM.render(<Header popular="Movies"/>, document.getElementById('header'));
  		if (this.state.loading){return (<p>Loading...</p>);}
  		var nb = 0;
    	return (
			<ul id="streamings">
            {
                data.entries.map((ent, i) => {
					if (ent.programType=='movies')
					{
						nb=nb+1;
						if (nb<=21)
						{
							return (
								<li key={i}>
									<span>
    										<strong>YEAR:</strong> {ent.releaseYear} <br /> <br /> <strong>SYNOPSIS:</strong> {ent.description}
   									</span>
									<img src={ent.images.poster_art.url} alt={ent.title}  width="135px" height="200px"/>
									<h3>{ent.title}</h3>
								</li>
							);
						}
					}
				})
			}
        	</ul>
    	);
  	}
}

class Series extends React.Component { //Classe pour les séries
	state = { // Le Loading
		loading:true
	}

	componentWillMount(){
		setTimeout(() => {
			this.setState({loading:false})
		},1500);
	}

  	render() {
  		ReactDOM.render(<Header popular="Series"/>, document.getElementById('header'));
  		if (this.state.loading){return (<p>Loading...</p>);}
  			//
  		var nb = 0;
    	return (
			<ul id="streamings">
            {
                data.entries.map((ent, i) => {
					if (ent.programType=='series')
					{
						nb=nb+1;
						if (nb<=21)
						{
							return (
								<li key={i}>
									<span>
    										<strong>YEAR:</strong> {ent.releaseYear} <br /> <br /> <strong>SYNOPSIS:</strong> {ent.description}
   									</span>
									<img src={ent.images.poster_art.url} alt={ent.title}  width="135px" height="200px"/>
									<h3>{ent.title}</h3>
								</li>
							);
						}
					}
				})
			}
        	</ul>
    	);
	}
}

class Main extends React.Component {  //Classe pour le main
  	render() {
    	return (
    		<HashRouter>
            	<Route exact path="/" component={Accueil}/>
            	<Route path="/Series" component={Series}/>
            	<Route path="/Movies" component={Movies}/>
    		</HashRouter>
    	);
  	}
}

ReactDOM.render(<Header popular="Titles"/>, document.getElementById('header'));
ReactDOM.render(<Footer/>, document.getElementById('footer'));

ReactDOM.render(<Main />, document.getElementById('content'));

