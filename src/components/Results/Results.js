import React, { Component } from 'react'
import Search from '../Search/Search'
import Title from '../Title/Title'
import Card from '../Card/Card'
import { connect } from 'react-redux'
import axios from 'axios'

import '../../spacers.css'
import './Results.css'
//import '../../debug.css'

class Results extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      pathQty: 0
    }
    this.loadResults=this.loadResults.bind(this)
  }

  componentDidMount(){
    this.loadResults();
  }

  loadResults(){
    axios.get(`/api/search/${this.props.match.params.searchid}`).then( res => {
      const results = res.data;
      this.setState({ results });
      this.setState({ pathQty : results.length})
    }).catch( err => {
      alert("Problem loading search results.")
    })
  }

  render() {
    
    const renderCards = this.state.results.map((e,i) => {
      return (
        <Card 
          key={e.path_name}
          isSearching
          img = {e.img}
          author = {e.username}
          pathName = {e.path_name}
          abstract = {e.abstract.slice(0, 160)}
          // callback = {this.displayPathDetails} //Not implemented
          tld = {e.skill_name}
          pid = {e.pid}
          hours = {e.hrs}
          rating = {e.rating}
          badge = {'Follow Path'}
          badgeCallback = {this.subscribe}
        />       
      )
    })

    return (
      <div className="background" style={{'background' : this.props.bgColor}}>
        <div className="headerWrapper">
          <Search />
        </div>
        <div className="titleWrapper">
          <Title 
            title = {this.props.match.params.searchid}
            subtitle = {`${this.state.pathQty} paths found`}
          />
        </div>
        <div className="resultsWrapper flexH ml-xl mr-xl aifs wrap">
          {renderCards}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { bgColor } = state 
  return {
      bgColor
  }
}

export default connect(mapStateToProps)(Results)

