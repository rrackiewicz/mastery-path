import React, { Component } from 'react'
import Search from '../Search/Search'
import Title from '../Title/Title'
import Card from '../Card/Card'
import { connect } from 'react-redux'
import axios from 'axios'

import '../../App.css'
import '../../spacers.css'
//import '../../debug.css'

class Paths extends Component {
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
      console.log(res.data, " Search Results")
      const results = res.data;
      this.setState({ results });
      this.setState({ pathQty : results.length})
    }).catch( err => {
      alert("fucked")
    })
  }

  render() {
    
    const renderCards = this.state.results.map((e,i) => {
      return (
        <Card 
          key={e.path_name}
          isSearching
          img = {e.img}
          author = {e.full_name}
          pathName = {e.path_name}
          abstract = {e.abstract.slice(0, 160)}
          tld = {e.skill_name}
          pid = {e.pid}
          hours = {e.hrs}
          rating = {e.rating}
        />       
      )
    })

    return (
      <div className="background flexV" style={{'background' : this.props.bgColor}}>
        <Search 
          isLoggedIn                                                 
        />
        <Title 
          title = "Paths"
        />
        <div className="cardContainer flexH ml-l aifs wrap">
          {renderCards}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { bgColor, isBuilding } = state 
  return {
      bgColor,
      isBuilding
  }
}

export default connect(mapStateToProps)(Paths)

