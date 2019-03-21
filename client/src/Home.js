import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Form, FormGroup, Input, Label, Popover, PopoverBody } from 'reactstrap';
import product from './product.jpg';
import icon from './icon.png';
import book from './book.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {Footer} from './Footer';
import './App.css';


export class Home extends Component {

	// initialize our state 

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			id: 0,
			urlToShorten: null,
			shortenedUrl: null,
			popoverOpen: false,
			linksPowered: 0,
			intervalIsSet: false,
			idToDelete: null,
			idToUpdate: null,
			objectToUpdate: null
		};

		this.putDataToDB = this.putDataToDB.bind(this);
		this.callback = this.callback.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.toggle = this.toggle.bind(this);
		this.getDataFromDb = this.getDataFromDb.bind(this);
		/*this.deleteFromDB = this.deleteFromDB.bind(this);
		this.updateDB = this.updateDB.bind(this);*/
	}

	// when component mounts, first thing it does is fetch all existing data in our db
	// then we incorporate a polling logic so that we can easily see if our db has 
	// changed and implement those changes into our UI
	componentDidMount() {
		window.scrollTo(0,0);
		this.getDataFromDb();
		if (!this.state.intervalIsSet) {
			let interval = setInterval(this.getDataFromDb, 1000);
			this.setState({ intervalIsSet: interval });
		}
	}

	// never let a process live forever 
	// always kill a process everytime we are done using it
	/*componentWillUnmount() {
		if (this.state.intervalIsSet) {
			clearInterval(this.state.intervalIsSet);
			this.setState({ intervalIsSet: null });
		}
	}
*/
	// fetch's data from databse to update number of links generated
	getDataFromDb = () => {
		axios.get("/getData")
			.then(data => {
				//handle success
				console.log('data returned looks like this: ' + data);
				console.log("stringified that's like this: " + JSON.stringify(data));
				//data.json();
				this.setState({ linksPowered: data.data.length });
			}).catch(err =>{
				//handle error
				console.log(err);
			});
	};
	/*

*/
	//consol.log's the new document made by putDataToDB
	callback = (response) => {
		console.log('response from post is: ' + response);
		console.log(JSON.stringify(response));
		console.log(response.data.original_url + ' has been shortened to ' + response.data.short_url);

		let urlToDisplay= 'https://mernurl.herokuapp.com/' + response.data.short_url;

		//change state so that shortenedURL will display
		this.setState({
			shortenedUrl: urlToDisplay,
			popoverOpen: false
		});
	}

	// our put method that uses our backend api
	// to create new query into our data base
	putDataToDB = (urlToShorten) => {

		console.log('calling axios.post from react');
		axios.post("/api/shorturl/new", {
			url: urlToShorten
		}).then(response => {
			console.log('sending response to console.log from react');
			this.callback(response);
		}).catch(err =>{
			console.log(err);
		});
	}

	//copies a shortened URL to keyboard
	handleClick() {
		//clear any selection
		if (window.getSelection) {window.getSelection().removeAllRanges();}

		//copy text in #shortened-url to clipboard
		let range = document.createRange();
		range.selectNode(document.getElementById('shortened-url'));
		window.getSelection().addRange(range);
		document.execCommand("copy");
		console.log("copied");

		//re-clear any selection
		if (window.getSelection) {window.getSelection().removeAllRanges();}
	}

	//handles popover when link is copied to clipboard
	toggle() {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		});
	}

	/*

	// our delete method that uses our backend api 
	// to remove existing database information
	deleteFromDB = idTodelete => {
		let objIdToDelete = null;
		this.state.data.forEach(dat => {
			if (dat.id == idTodelete) {
				objIdToDelete = dat._id;
			}
		});

		console.log(objIdToDelete);

		axios.delete("/api/deleteData", {
			data: {
				id: objIdToDelete
			}
		});
	};

	// our update method that uses our backend api
	// to overwrite existing data base information
	updateDB = (idToUpdate, updateToApply) => {
		let objIdToUpdate = null;
		this.state.data.forEach(dat => {
			if (dat.id == idToUpdate) {
				objIdToUpdate = dat._id;
			}
		});

		axios.post("/api/updateData", {
			id: objIdToUpdate,
			update: { message: updateToApply }
		});
	};*/


	
	render() {
		return (
		<div className='page'>	

			<div className='main' id='main'>
				<div className='statement'>
					<h1>SAVE BITS, USE SHORT URLS.</h1>
				</div>

				<div className='form-container'>
					<Form inline id='url-form'>
						<Input id='url-input' type="text" name='url' placeholder="Paste a link to shorten it"
							onChange={e => this.setState({ urlToShorten: e.target.value })}							
						/>
						<Button id='inline-button' color='primary' value="POST URL" 
							onClick={() => this.putDataToDB(this.state.urlToShorten)}
						>
							SHORTEN
						</Button>
					</Form>
				</div>	


				{this.state.shortenedUrl != null &&
				<div className='result-container' onClick={this.handleClick}>
					<div className='result-text' id='shortened-url'>
						{this.state.shortenedUrl}
					</div>
					<Popover placement="bottom" isOpen={this.state.popoverOpen} target="shortened-url" toggle={this.toggle}>
					<PopoverBody>Copied</PopoverBody>
					</Popover>
				</div>					
		        
				}		
			</div>





			
			<div className='description'>
				<h2>UNLEASH THE POWER OF THE LINK</h2>
				<p className='desc-p'>Hyperlinks are everywhere and they can lead you to just as many places. Help others by saving space on the interweb and shortening your links using the form above.</p>
				<Container className='perk-cards-container'>
					<Row>
						<Col md='4' className='perk-card'>
							<FontAwesomeIcon icon={faCoffee} size='3x' transform='grow-1' color='#007bff'/>
							<h3 className='card-h3'>Perk One</h3>
							<p className='card-p'>Pellentesque eleifend arcu nisi, feugiat efficitur ligula pharetra non. Morbi nunc neque, lacinia quis nisl a, volutpat volutpat enim. Morbi est lectus, luctus sit amet metus ac, porttitor tristique dui. Phasellus rhoncus odio non erat rutrum efficitur porta nec ipsum. </p>
						</Col>
						<Col md='4' className='perk-card'>
							<FontAwesomeIcon icon={faCoffee} size='3x' transform='grow-1' color='#007bff'/>
							<h3 className='card-h3'>Perk Two</h3>
							<p className='card-p'>Pellentesque eleifend arcu nisi, feugiat efficitur ligula pharetra non. Morbi nunc neque, lacinia quis nisl a, volutpat volutpat enim. Morbi est lectus, luctus sit amet metus ac, porttitor tristique dui. Phasellus rhoncus odio non erat rutrum efficitur porta nec ipsum. </p>
						</Col>
						<Col md='4' className='perk-card'>
							<FontAwesomeIcon icon={faCoffee} size='3x' transform='grow-1' color='#007bff'/>
							<h3 className='card-h3'>Perk Three</h3>
							<p className='card-p'>Pellentesque eleifend arcu nisi, feugiat efficitur ligula pharetra non. Morbi nunc neque, lacinia quis nisl a, volutpat volutpat enim. Morbi est lectus, luctus sit amet metus ac, porttitor tristique dui. Phasellus rhoncus odio non erat rutrum efficitur porta nec ipsum. </p>
						</Col>				
					</Row>
				</Container>
			</div>



			<div className='frame-frame'>
				<div className='frame-div'>
					<iframe 
						src="https://www.youtube.com/embed/lSX5dPdArZ0" 
						frameborder="0" 
						allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" 
						allowfullscreen/>
				</div>


				<div className='btn-holder'>
					<Button color='primary'>LEARN MORE</Button>
				</div>
			</div>



			<div className='ending'>
				<div className='quantifiable'>
					<h2>{this.state.linksPowered}</h2>
					<h3 className='ending-h3'>LINKS POWERED BY MERNURL</h3>
				</div>
			</div>

			<Footer/>

		</div>
		);
	}
}


/*
	render() {

	    const { data } = this.state;
	    
	    return (
			<div>
				<ul>
					{data.length <= 0
						? "NO DB ENTRIES YET"
						: data.map(dat => (
							<li style={{ padding: "10px" }} key={data.message}>
								<span style={{ color: "gray" }}> id: </span> {dat.id} <br />
								<span style={{ color: "gray" }}> data: </span>
								{dat.message}
							</li>
						))}
				</ul>
				<div style={{ padding: "10px" }}>
					<input
						type="text"
						onChange={e => this.setState({ message: e.target.value })}
						placeholder="add something in the database"
						style={{ width: "200px" }}
					/>
					<button onClick={() => this.putDataToDB(this.state.message)}>
						ADD
					</button>
				</div>
				<div style={{ padding: "10px" }}>
					<input
						type="text"
						style={{ width: "200px" }}
						onChange={e => this.setState({ idToDelete: e.target.value })}
						placeholder="put id of item to delete here"
					/>
					<button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
						DELETE
					</button>
				</div>
				<div style={{ padding: "10px" }}>
					<input
						type="text"
						style={{ width: "200px" }}
						onChange={e => this.setState({ idToUpdate: e.target.value })}
						placeholder="id of item to update here"
					/>
					<input
						type="text"
						style={{ width: "200px" }}
						onChange={e => this.setState({ updateToApply: e.target.value })}
						placeholder="put new value of the item here"
					/>
					<button
						onClick={() =>
							this.updateDB(this.state.idToUpdate, this.state.updateToApply)
							}
						>
							UPDATE
						</button>
				</div>
			</div>
		);
	}
}
*/