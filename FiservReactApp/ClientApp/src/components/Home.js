import React, { Component } from 'react';
import FetchScores from './FetchScores';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Top 10 Leaderboard</h1>
            <FetchScores listCount={10} />
      </div>
    );
  }
}
