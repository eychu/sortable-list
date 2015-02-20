'use strict';

var React = require('react');
var Qajax = require('qajax');
var SortableList = require('./SortableList.js');

var App = React.createClass({

  getInitialState() {

    Qajax.getJSON('/oscar.json').then(function(data) {
      var titles = data.programs.map(function(item) {
        return item['title']
      });
      this.setState({data: data, titles: titles, selectedItem: {}});
    }.bind(this));

    return {
      data: {},
      titles: [],
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
            <div className="col-md-6">
              <SortableList
                items={this.state.titles}
                selectedItem={this.state.selectedItem}
                selectItem={this.handleSelectItem}
                updateItems={this.handleUpdateItems}
              />
            </div>
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">Selected item</div>
                <div className="panel-body">
                  <pre>
                    {JSON.stringify(this.state.selectedItem, undefined, 2)}
                  </pre>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">Stringify items list</div>
                <div className="panel-body">
                  <code>
                    {this.stringifyData(this.state.data.programs)}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  stringifyData(items) {
    var resultArray = _.map(items, function(item, i) {
      return (i + 1) + ' ' + item.caption + ' ' + item.programid;
    });
    return resultArray.join('; ');
  },

  handleSelectItem(title) {
    var item = _.find(this.state.data.programs, {title: title});
    this.setState({selectedItem: item});
  },

  handleUpdateItems(titles) {
    var data = this.state.data;
    data.programs = _.map(titles, function(title) {
      return _.find(data.programs, {title: title});
    });
    this.setState({data: data, titles: titles});
  }

});

module.exports = App;