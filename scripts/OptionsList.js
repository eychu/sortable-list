'use strict';

var React = require('react');
var _ = require('lodash');
var SortableMixin = require('./libs/react-sortable-mixin');
require('style!css!../css/styles.css');

var OptionsList = React.createClass({

  mixins: [SortableMixin],
  sortableOptions: {
    group: 'ballot',
    sort: false,
    handle: '.list-group-item'
  },

  getInitialState() {
    return this.props;
  },

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  },

  render() {
    return (
      <div className="list-group option-container">
        {this.renderItems()}
      </div>
    )
  },

  renderItems() {
    var items = this.state.items;
    return _.map(items, function(item) {
      var selectedItem = this.state.selectedItem;
      var classNames = 'list-group-item option-item ';
      if (selectedItem.title === item) {
        classNames += 'active';
      }
      return (
        <div
          key={item}
          data-id={item}
          className={classNames}
          onClick={this.handleSelectItem.bind(this, item)}
          onTouchStart={this.handleSelectItem.bind(this, item)}
        >
          <div className='image'>
            <img className='list-group-img' src="img/image.jpg" />
          </div>
          <div className='title'>{item}</div>
        </div>
      )
    }.bind(this))
  },

  handleSelectItem(title) {
    this.props.selectItem(title);
  }

});

module.exports = OptionsList;