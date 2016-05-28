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
        <GrudgeList/>
      </div>
    )
  }
});

const GrudgeList = React.createClass ({

  createNewGrudge({offender, offense}) {
    this.setState({
      grudges: grudges.concat({offender, offense, id: Date.now()
      })
    });
  },

  render() {
    return (
      <div className="grudge-list">
        <h2>Grudges</h2>
        <GrudgeForm onCreateGrudge={this.createNewGrudge}/>
      </div>
    )
  }

  // return (
  //   <div className="idea-list">
  //     <h2>Ideas</h2>
  //     <NewIdeaForm onCreateIdea={this.createNewIdea} />
  //     <IdeaFilter onChange={this.updateFilterText} />
  //     {ideaComponents}
  //   </div>
  // );
});
const GrudgeForm = React.createClass ({
  getInitialState(){
    return {
      offender: "",
      offense: ""
    };
  },

  createGrudge(e) {
    e.preventDefault();
    this.props.onCreateGrudge(this.state);
    this.clearForm();
  },

  render() {
    return (
      <form className="grudge-form" onSubmit={this.createGrudge}>
        <input type="text" className="offender" placeholder="no good bastard" name="offender"/>
        <textarea className="offense" placeholder="offense" name="offense"></textarea>
        <input type="text" className="submitGrudge"/>
        <button className="forgiven">Forgive</button>
        <button className="unforgiven">Unforgive</button>
      </form>
    );
  }
});

ReactDOM.render(<GrudgeBox title="Grudge Box"/>, document.querySelector('.application'))
