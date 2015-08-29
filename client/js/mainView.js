

var MainView = React.createClass({
  render: function() {
    return (
      <p>Hello World</p>
    );
  },
});


React.render(
  <MainView />,
  document.getElementById('content')
);