'use strict';

var React = require('react');
var Qajax = require('qajax');
var _ = require('lodash');
var BallotList = require('./BallotList.js');
var OptionsList = require('./OptionsList.js');

var App = React.createClass({

  getInitialState() {

    Qajax.getJSON('/oscar.json').then(function(data) {
      this.setState({data: data, options: data.programs});
    }.bind(this));

    return {
      data: {},
      options: {},
      ballot: {},
      selectedItem: {}
    }
  },

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Sortable List</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading">Ballot</div>
                <div className="panel-body">
                  <BallotList
                    items={this.getTitles(this.state.ballot)}
                    selectedItem={this.state.selectedItem}
                    selectItem={this.handleSelectItem}
                    updateItems={this.handleUpdateBallot}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading">Options</div>
                <div className="panel-body">
                  <OptionsList
                    items={this.getTitles(this.state.options)}
                    selectedItem={this.state.selectedItem}
                    selectItem={this.handleSelectItem}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading">Selected item</div>
                <div className="panel-body">
                  <pre>
                    {JSON.stringify(this.state.selectedItem, undefined, 2)}
                  </pre>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">Stringify items list</div>
                <div className="panel-body">
                  <code>
                    {this.stringifyData(this.state.ballot)}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  getTitles(items) {
    return _.pluck(items, 'title')
  },

  stringifyData(items) {
    return _.map(items, function(item, i) {
      return (i + 1) + ' ' + item.caption + ' ' + item.programid;
    }).join('; ');
  },

  handleSelectItem(title) {
    var item = _.find(this.state.data.programs, {title: title});
    this.setState({selectedItem: item});
  },

  handleUpdateBallot(titles) {
    var ballot = this.getItemsByTitles(titles);
    this.setState({
      ballot: ballot,
      options: _.difference(this.state.data.programs, ballot)
    });
  },

  getItemsByTitles(titles) {
    return _.map(titles, function(title) {
      return _.find(this.state.data.programs, {title: title});
    }.bind(this));
  }

});

module.exports = App;