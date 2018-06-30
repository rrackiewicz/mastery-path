import React, { Component } from 'react'
import Header from '../Header/Header'
import Title from '../Title/Title'
import Card from '../Card/Card'
import CardBlank from '../CardBlank/CardBlank'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router'
import { action_updatePath, action_updateIsBuilding } from '../../ducks/reducer'

import '../../spacers.css'
import './Paths.css'
//import '../../debug.css'

class Paths extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      pathQty: 0,
      isLoaded: false
    }
    this.loadResults = this.loadResults.bind(this)
    this.loadPath = this.loadPath.bind(this)
    this.publishPath = this.publishPath.bind(this)
  }

  componentDidMount(){
    this.loadResults();
  }

  loadResults(){
    if (this.props.userContext === 'master') {
      axios.get("/api/masterpaths").then( res => {
        const results = res.data;
        this.setState({ results });
        this.setState({ pathQty : results.length})
        this.setState({ isLoaded: true })
        console.log("Retrieved Master Paths")
      }).catch( err => {
        alert("Problem loading search results.")
      })
    } else {
      axios.get("/api/apprenticepaths").then( res => {
        const results = res.data;
        this.setState({ results });
        this.setState({ pathQty : results.length})
        console.log("Retrieved Apprentice Paths")
      }).catch( err => {
        alert("Problem loading search results.")
      })
    }
  }

  loadPath(path){
    const { pid } = path
    axios.get(`/api/paths/${pid}`).then( res => {
      const path = res.data;
      this.props.action_updatePath(path)
      this.props.history.push(`/path/${pid}`)
      this.props.action_updateIsBuilding(true)
    }).catch( err => {
      alert("Problem loading search results.")
    })
  }

  publishPath(){
    //This will have to be wired up differently
  }

  render() {
    const renderCards = this.state.results.map((e,i) => {
      return (
        <Card 
          key={e.path_name}
          isSearching
          img = {e.img}
          author = {e.first_name + " " + e.last_name}
          pathName = {e.path_name}
          abstract = {e.abstract ? e.abstract.slice(0, 160) : ''}
          tld = {e.skill_name}
          pid = {e.pid}
          hours = {e.hrs}
          rating = {e.rating}
          callback = {this.loadPath}
          badge = {e.pub ? 'Unpublish' : 'Publish'}
          badgeCallback = {this.publishPath}
        />       
      )
    })

    return (
      <div className="background" style={{'background' : this.props.bgColor}}>
        <div className="headerWrapper">
          <Header />
        </div>
        <div className="titleWrapper">
          <Title 
            title = 'Paths'
            subtitle = {`${this.state.pathQty} paths found`}
          />
        </div>
        {this.state.isLoaded ?
          null
          :
          <div className="resultsWrapper flexH ml-xl mr-xl aifs wrap">
            <CardBlank/>
          </div>
        }
        <div className="resultsWrapper flexH ml-xl mr-xl aifs wrap">
          {renderCards}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { bgColor, userContext, path } = state 
  const { pid } = path
  return {
      bgColor,
      userContext,
      path,
      pid
  }
}

const actions = {
  action_updatePath,
  action_updateIsBuilding
}

export default connect(mapStateToProps, actions)(withRouter(Paths))

