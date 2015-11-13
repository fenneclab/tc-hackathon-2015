import m from 'mithril';
//namespace
const app = {};

//model
app.BearList = () => {
  return m.request({method: "GET", url: "http://localhost:3000/bears"});
};

//controller
app.controller = () => {
  const bears = app.BearList();
  return {
    bears: bears,
    rotate: () => {
      bears().push(bears().shift());
    }
  }
};

//view
app.view = ctrl => {
  console.log(ctrl.bears());
  return [
    ctrl.bears().bears.map(bear => {
      return m('div', [
        m('div', `id: ${bear.id}`),
        m('div', `name: ${bear.name}`)
      ]);
    })
  ];
};

//initialize
m.mount(document.getElementById('example'), app);
