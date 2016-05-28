const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store');

require('./reset.css');
require('./style.scss');

const GrudgeBox = React.createClass ({

  render() {
    return(
      <div class="container">
        <h1>Grudge List</h1>
        <GrudgeForm/>
      </div>
    );
  }
});

const GrudgeForm = React.createClass ({
  getInitialState(){
    return {
      person: "",
      offense: ""
    };
  },

  render() {
    return (
      <form className="grudge-form">
        <input type="text" className="db" placeholder="no good bastard" name="person"/>
        <textarea className="grudge-info"  name="offense"></textarea>
        <button className="forgiven">Forgive</button>
        <button className="unforgiven">Unforgive</button>
      </form>
    );
  }
});

ReactDOM.render(<GrudgeBox title="Grudge Box"/>, document.querySelector('.application'))
