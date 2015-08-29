
var MainView = React.createClass({
  render: function() {
    return (
      <div id='main'> 
        <Header />
        <ContentBox type={this.props.type}/>
      </div>
    );
  },
});

var Header = React.createClass({
  render: function() {
    return (
      <div id='headerbar'>
        <h1>PartyOf4</h1>
      </div>
    );
  },
});

var ContentBox = React.createClass({
  render: function() {
    if (this.props.type === 'landing') {
      var content = <Description />
    } else {
      var content = <p>Hello world</p>
    }

    return (
      <div id='contentbox'>
        {content}
        <Credits />
      </div>
    );
  },
});

var Description = React.createClass({
  render: function() {
    return (
      <div id='desc'>
        <p> 
        Get into hot new restaurants without the wait!
        </p>
        <img id="mainimg" src="../assets/table.jpg"></img>
        <p>
         A social app for finding open seats at nearby restaurants. 
         <br/><br/>
         Host a table, meet new people & eat great food!
         <br/><br/>
         Coming soon ...
         <br/>
        </p>
      </div>
    );
  },
});

var Credits = React.createClass({
  render: function() {
    return (
      <p>©2015 Brandon, Nick, Shelley, Warren</p>
    );
  }
});


React.render(
  <MainView type='landing'/>,
  document.getElementById('content')
);