'use strict';

var React = require('react');
var _ = require('lodash');
var SortableMixin = require('./libs/react-sortable-mixin');
require('style!css!../css/styles.css');

var BallotList = React.createClass({

  mixins: [SortableMixin],
  sortableOptions: {group: 'ballot'},

  getInitialState: function() {
    return this.props;
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(nextProps);
  },

  handleSort: function(evt, sortable) {
    this.props.updateItems(sortable.toArray());
  },

  render: function() {
    return (
      <ul className="list-group">
        {this.renderItems()}
      </ul>
    )
  },

  renderItems: function() {
    var items = this.state.items;
    return _.map(items, function(item, i) {
      var selectedItem = this.state.selectedItem;
      var classNames = 'list-group-item ';
      if (selectedItem.title === item) {
        classNames += 'active';
      }
      return (
        <li
          key={item}
          data-id={item}
          className={classNames}
          onClick={this.handleSelectItem.bind(this, item)}
          onTouchStart={this.handleSelectItem.bind(this, item)}
        >
          <kbd>{i + 1}</kbd> {item}
        </li>
      )
    }.bind(this))
  },

  handleSelectItem: function(title) {
    this.props.selectItem(title);
  }

});

module.exports = BallotList;