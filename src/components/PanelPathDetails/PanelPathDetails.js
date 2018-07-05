import React, { Component } from 'react';
import Button from '../Button/Button'
import Pill from '../Pill/Pill'
import Field from '../Field/Field'
import Error from '../Error/Error'
import TextArea from '../TextArea/TextArea'
import axios from 'axios'
import { connect } from 'react-redux'
import { action_updatePathName } from '../../ducks/reducer'
import { action_updatePathAbstract } from '../../ducks/reducer'
import { action_updatePathImg } from '../../ducks/reducer'
import { action_updatePathLearningDomain } from '../../ducks/reducer'
import { action_updatePathLearningSubdomains } from '../../ducks/reducer'
import { action_Delete_Subdomain } from '../../ducks/reducer'

import '../../spacers.css'
import './PanelPathDetails.css'
//import '../../debug.css'

class PanelPathDetails extends Component {
	constructor() {
    super()
    this.state = {
			path : {
				learningSubdomain: '',
				nameIsAvailable: true
			}
		}
		this.updatePathName = this.updatePathName.bind(this)
		this.updateAbstract = this.updateAbstract.bind(this)
		this.updateImage = this.updateImage.bind(this)
		this.updateLearningDomain = this.updateLearningDomain.bind(this)
		this.updateLearningSubdomain = this.updateLearningSubdomain.bind(this)
		this.addLearningSubdomain = this.addLearningSubdomain.bind(this)
		this.deleteSubdomain = this.deleteSubdomain.bind(this)
		// this.removeLearningSubdomain = this.removeLearningSubdomain.bind(this)
	}

	updatePathName(e) {
		//this if even necessary?
		console.log(e.target.value)
		const payload = { path_name: e.target.value, pid: this.props.pid}
		console.log(payload)
			axios.post("/api/paths/verifypathname", payload).then( res => {
				if (res.data.length === 0) {
					console.log("then", res.data)
					this.setState({nameIsAvailable : true})
				}
				else {
					console.log("catch", res.data)
					this.setState({nameIsAvailable : false})
				}
			
			}).catch(err => {
				console.log(err)
			})

		this.props.action_updatePathName(e.target.value)
	}

	updateAbstract(e) {
		this.props.action_updatePathAbstract(e.target.value)
	}

	updateImage(e) {
		this.props.action_updatePathImg(e.target.value)
	}

	updateLearningDomain(e) {
		this.props.action_updatePathLearningDomain(e.target.value)
	}

	updateLearningSubdomain(e) {
		this.setState({learningSubdomain : e.target.value}) 
	}

	//FIXME:
	addLearningSubdomain(e) {
		if (e.key === 'Enter') {
			const learningSubdomains = [...this.props.learningSubdomains]
			learningSubdomains.push(e.target.value.toLowerCase().trim().split(' ').map(e => e[0].toUpperCase() + e.slice(1)).join(' '))
			this.props.action_updatePathLearningSubdomains(learningSubdomains)
			this.setState({ learningSubdomain : '' })
    }
	}

	deleteSubdomain(index) {
		this.props.action_Delete_Subdomain(index)
	}


	render(){
		const titleOverlay = {
			backgroundColor: this.props.bgColor,
			padding: '7px'
		}

		const renderSubdomains = this.props.learningSubdomains.map((e,i) => {
			return (
				<div key={e} className="pillConainter">
				<Pill 
					payload = {e}
					callback = {this.deleteSubdomain}
					icon = "fas fa-times fa-sm"
					canDelete
					index = {i}
				/>
				</div>
			)
		})

		const posterImage = {
			backgroundImage: `url(${this.props.img})`,
    }

		return(

			<div className="panel mt-s">
				<h3 style={titleOverlay} className="panelTitle">Path Details</h3>
				<div>
					<label>Path Name (Required)</label>
					<div className="flexH mt-xs">
						<div className="fone mr-s">
							<Field 
								value={this.props.path_name}
								placeholder = 'Choose wisely!'
								callback = {this.updatePathName}
							/>
							{this.props.path_name.length > 0 ?
								<Error 
									iconGood = "fas fa-check-circle fa-sm"
									iconBad = "fas fa-times-circle fa-sm"
									payload = {this.state.nameIsAvailable ? "Path name is available." : "Path name is taken." }
									warning = {this.state.nameIsAvailable ? false : true}
								/>
								:
								null
							}
						</div>
						<div>
							<Button 
								payload = 'Description'
								// callback = {this.updateContext}
								bgColor = {this.props.bgColor}
								textColor = '#ffffff'
							/>
						</div>
					</div>
					{/* TODO: Conditionally render here to enable or disable error */}
					{/* <Error 
						payload = 'Name already taken'
					/> */}
				</div>

				<div className="mt-m">
					<label>Abstract (Required)</label>
					<div className="mt-xs">
						<TextArea 
							value={this.props.abstract}
							placeholder = 'Stand out in 160 characters or less'
							callback = {this.updateAbstract}
							rows = {4}
						/>
					</div>
					<Error 
						payload = {`${this.props.abstract.length} / 160 characters`}
						warning = {this.props.abstract.length > 160 ? true : false}
					/>
				</div>

				<div className="mt-m">
					<label>Learning Domain (Required)</label>
					<div className="mt-xs">
						<Field 
							value={this.props.learningDomain}
							placeholder = 'Skill Name'
							callback = {this.updateLearningDomain}
						/>
					</div>
					{this.props.learningDomain.length > 0 ?
						<div className="flexH">
							<Pill 
								payload = {this.props.learningDomain}
							/>
						</div>
					: null
					}
					{/* TODO: Conditionally render here to enable or disable error */}
					{/* <Error 
						payload = 'Name already taken'
					/> */}
				</div>

				<div className="mt-m">
					<label>Learning Subdomains</label>
					<div className="mt-xs">
						<Field 
							value={this.state.learningSubdomain}
							placeholder = 'Skill Name'
							callback = {this.updateLearningSubdomain}
							enterCallback = {this.addLearningSubdomain}
						/>
					</div>
					{this.props.learningSubdomains.length > 0 ?
						<div className="flexH wrap">
							{renderSubdomains}
						</div>
					: null
					}
					{/* TODO: Conditionally render here to enable or disable error */}
					{/* <Error 
						payload = 'Name already taken'
					/> */}
				</div>

				<div className="mt-m">
					<label>Poster Image</label>
					<div className="flexH mt-xs">
						<div className="fone mr-s">
							<Field 
								value={this.props.img}
								placeholder = 'Paste URL here'
								callback = {this.updateImage}
								//enterCallback = {this.updateImage}
							/>
						</div>
						<div>
							<Button 
								payload = 'Upload'
								icon = 'fas fa-upload'
								// callback = {this.uploadImage}
								bgColor = {this.props.bgColor}
								textColor = '#ffffff'
							/>
						</div>
					</div>
					
					<div style={posterImage} className="posterImage mt-s">
						&nbsp;
					</div>
					{/* TODO: Conditionally render here to enable or disable error */}
					{/* <Error 
						payload = 'Name already taken'
					/> */}
				</div>

				<div className="flexH mt-l">
					<div className="">
							<Button 
								payload = 'Reset'
								// TODO: callback = {this.resetForm}
								bgColor = {this.props.bgColor}
								textColor = '#ffffff'
							/>
						</div>
					<div className="mla">
						<Button 
							payload = 'Next'
							//callback = {}
							bgColor = '#FFD002'
              textColor = '#363636'
						/>
					</div>
				</div>
				
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { bgColor, userContext, path } = state
	const { pid, path_name, abstract, img, learningDomain, learningSubdomains } = path
  return {
      bgColor,
			userContext,
			path,
			pid,
			path_name,
			abstract,
			img,
			learningDomain,
			learningSubdomains
  }
}

let actions = {
	action_updatePathName,
	action_updatePathAbstract,
	action_updatePathImg,
	action_updatePathLearningDomain,
	action_updatePathLearningSubdomains,
	action_Delete_Subdomain
}

export default connect(mapStateToProps, actions)(PanelPathDetails)
