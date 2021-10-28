import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import FetchQuotes from './components/FetchQuotes';
import FetchScores from './components/FetchScores';
import AddQuote from './components/AddQuote';
import { TypeApp } from './components/type-app/TypeApp';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;
  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/typing' component={TypeApp} />
        <Route path='/fetch-quotes' component={FetchQuotes} />
        <Route path='/fetch-scores' component={FetchScores} />
        <Route path='/add-quote' component={AddQuote} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
