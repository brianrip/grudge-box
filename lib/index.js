const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store');

require('./reset.css');
require('./style.scss');

class GrudgeBox extends React.Component {
  constructor() {
    super();
    this.state = {
      grudges: store.all(),
    };
  }

  componentDidMount() {
    store.on('change', grudges => {
      this.setState({ grudges });
    });
  }

  render() {
    const activeGrudge = this.state.grudges.find(grudge => grudge.active);

    return(
      <div className="GrudgeBox">
        <section className="sidebar">
          <header>
            <h1>{this.props.title}</h1>
          </header>
          <div className="container">
            <div className="left-col">
              <CreateGrudge/>
              <OffenderCount/>
            </div>
            <div className="right-col">
              <GrudgeList grudges={this.state.grudges}/>
            </div>
          </div>
        </section>
        <selection className="main-content">
          <ActiveGrudge grudge={activeGrudge}/>
        </selection>
      </div>
    );
  }
}

class CreateGrudge extends React.Component {
  constructor() {
    super();
    this.state = {
      offender: '',
      offense: '',
    };
  }

  updateProperties(e) {
    const { name, value } =  e.target;
    this.setState({ [name]: value});
  }

  createGrudge(e) {
    e.preventDefault();
    store.create(this.state);
    this.setState({ offender: '', offense: ''})
  }

  render() {
    return (
      <div className="CreateGrudge">
        <form>
          <input className="CreateGrudge-offender"
            name="offender"
            placeholder="Offender"
            value={this.state.offender}
            onChange={(e) => this.updateProperties(e)}
          />
          <textarea className="CreateGrudge-offense"
            name="offense"
            placeholder="Offense"
            value={this.state.offense}
            onChange={(e) => this.updateProperties(e)}
          />
          <input className="CreateGrudge-submit"
            type="submit"
            onClick={(e) => this.createGrudge(e)}
          />
        </form>  
      </div>
    );
  }
}
const GrudgeList = ({ grudges }) => {
  return (
    <div className="GrudgeList">
      {grudges.map(grudge => <GrudgesListItem {...grudge} key={grudge.id}/>)}
    </div>
  );
};

function forgiveOffender(id, forgiven) {
  if (forgiven === false) {
    return <button onClick={() => store.forgive(id)}>Forgive</button>
  } else {
    return <button onClick={() => store.unForgive(id)}>Un-forgive</button>
  }
}

const OffenderCount = () => {
  var totalOffenders = store.all().length;
  var forgivenCount = store.forgiven();
  var unforgivenCount = store.unforgiven();
  return (
    <div className="OffenderCount">
      <h3>Total: {totalOffenders}</h3>
      <h3>Forgiven: {forgivenCount}</h3>
      <h3>Unforgiven: {unforgivenCount}</h3>
    </div>
  )
}
const GrudgesListItem = ({ id, offender, offense, active, forgiven }) => {
  var forgiveness = forgiveOffender(id, forgiven)
  return (
    <div className={active ? 'GrudgesListItem is-active' : 'GrudgesListItem'}>
      <h3 className='GrudgesListItem-offender'>{offender}</h3>
      <div className='GrudgesListItem-offense'>{offense}</div>
      <div className='GrudgesListItem-buttons'>
        <button onClick={() => store.select(id)}>Select</button>
        <button onClick={() => store.destroy(id)}>Destroy</button>
        {forgiveness}
      </div>
    </div>
  );
};

const ActiveGrudge = ({grudge}) => {
if (!grudge) { return <p  className="ActiveGrudge"></p> }

  const updateGrudge = (e) => {
    const { name, value } = e.target;
    store.update(grudge.id, Object.assign(grudge, { [name]: value }));
  };

  return (
    <div className="ActiveGrudge">
      <input className="ActiveGrudge-offender"
        name="offender"
        value={grudge.offender}
        onChange={updateGrudge}
      />
      <textarea className="ActiveGrudge-offense"
        name="offense"
        value={grudge.offense}
        onChange={updateGrudge}
      />
    </div>
  )
}

ReactDOM.render(<GrudgeBox title="Grudge Box"/>, document.querySelector('.application'))
