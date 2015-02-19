'use strict';

var React = require('react');
var SortableList = require('./SortableList.js');

var App = React.createClass({
  render() {
    return (
      <SortableList />
    );
  }
});

module.exports = App;