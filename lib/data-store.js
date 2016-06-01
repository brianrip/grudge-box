const EventEmitter = require('events');

  let grudges = [];

  const store = new EventEmitter();

  store.all = () => grudges.concat([]);

  const storedGrudges = localStorage.getItem('grudges');
  if(storedGrudges) { grudges = JSON.parse(storedGrudges); }

  store.all = () => grudges.concat([]);

  store.create = ({ offender, offense }) => {
    grudges = grudges.concat({ offender, offense, forgiven: false, active: false, id: Date.now() });
    store.emit('change', grudges);
  };


  store.forgive = (id) => {
    grudges = grudges.map(grudge => {
      if (grudge.id !== id) {
        return grudge;
      } else {
        grudge.forgiven = true;
        return grudge;
      }
    });
    store.emit('change', grudges);
  };

  store.unForgive = (id) => {
    grudges = grudges.map(grudge => {
      if (grudge.id !== id) {
        return grudge;
      } else {
        grudge.forgiven = false;
        return grudge;
      }
    });
    store.emit('change', grudges);
  };

  store.destroy = (id) => {
    grudges = grudges.filter(grudge => grudge.id !== id);
    store.emit('change', grudges);
  };

  store.forgiven = () => {
    return grudges.filter(grudge => grudge.forgiven === true).length;
  };

  store.unforgiven = () => {
    return grudges.filter(grudge => grudge.forgiven === false).length;
  };

  store.update = (id, data) => {
    grudges = grudges.map(grudge => {
      if (grudge.id !== id) { return grudge; }
      return Object.assign(grudge, data);
    });
    store.emit('change', grudges);
  };

  store.select = (id) => {
    grudges = grudges.map(grudge => Object.assign(grudge, {active: grudge.id === id }));
    store.emit('change', grudges);
  };

  store.deselect = () => {
    grudges = grudges.map(grudge => Object.assign(grudge, { active: false}));
    store.emit('change', grudges);
  };

  store.on('change', () => {
    localStorage.setItem('grudges', JSON.stringify(grudges));
  });

module.exports = store;
