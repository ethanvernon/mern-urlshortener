import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {faAngleDoubleUp} from '@fortawesome/free-solid-svg-icons';


export class Footer extends Component {
	render() {
		return (
			<div className='footer'>
				<div className='social-media'>
					<a href="https://github.com/ethanvernon" target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon icon={ faGithub } size='1x' transform="grow-10" color='gray' className='social-icons'/>
					</a>
					<a href="https://www.linkedin.com/in/ethanvernon/" target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon icon={ faLinkedinIn } size='1x' transform="grow-10" color='gray' className='social-icons'/>	
					</a>
				</div>
				<p>Handcrafted by me © Ethan Vernon</p>
				<div className='up-container'>
					<a href="#top">
						<FontAwesomeIcon icon={ faAngleDoubleUp } size='2x' transform="grow-1"  className='back-top'/>
					</a>
				</div>				
			</div>
		);
	}
}