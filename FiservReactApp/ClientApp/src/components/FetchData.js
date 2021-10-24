import React, { Component } from 'react';


export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { quotes: [], loading: true };
  }

  componentDidMount() {
    this.populateQuoteData();
  }

  static renderquotesTable(quotes) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Author</th>
            <th>Quote</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map(quote =>
            <tr key={quote.QuoteID}>
              <td>{quote.author}</td>
              <td>{quote.quote1}</td>
             </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderquotesTable(this.state.quotes);

    return (
      <div>
        <h1 id="tabelLabel" >Quotes</h1>
        {contents}
      </div>
    );
  }

  async populateQuoteData() {
      const response = await fetch('api/Quotes')
    const data = await response.json();
    this.setState({ quotes: data, loading: false });
  }
}
