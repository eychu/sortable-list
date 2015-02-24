'use strict';

var React = require('react');
var _ = require('lodash');
var SortableMixin = require('./libs/react-sortable-mixin');
require('style!css!../css/styles.css');

var BallotList = React.createClass({

  mixins: [SortableMixin],
  sortableOptions: {
    group: 'ballot',
    model: 'titles',
    handle: '.list-group-item'
  },

  getInitialState() {
    var titles = _.pluck(this.props.items, 'title');
    return {items: this.props.items, titles: titles, selectedItem: this.props.selectedItem};
  },

  componentWillReceiveProps(nextProps) {
    var titles = _.pluck(nextProps.items, 'title');
    this.setState({items: nextProps.items, titles: titles, selectedItem: nextProps.selectedItem});
  },

  handleSort() {
    this.props.updateItems(this.state.titles);
  },

  render() {
    return (
      <div className="list-group ballot-container" >
        {this.renderItems()}
      </div>
    )
  },

  renderItems() {
    var items = this.state.titles;
    return _.map(items, function(item, i) {
      return (
        <div
          key={item}
          data-id={item}
          className={this.getClassNames(item)}
          onClick={this.handleSelectItem.bind(this, item)}
          onTouchStart={this.handleSelectItem.bind(this, item)}
        >
          <div className='order'>{i + 1}</div>
          <div className='caption'>{this.getCaption(item)}</div>
          <img className='list-group-img' style={{width: '50px', height: '50px'}} src="img/image.jpg" alt=""/>
          <div className='title'>{item}</div>
          <div className='play'>Play &#x25B6;</div>
        </div>
      )
    }.bind(this))
  },

  getCaption(title) {
    var caption = '';
    var fullItem = _.find(this.state.items, {title: title});
    if (fullItem) {
      caption = fullItem.caption;
    }
    return caption;
  },

  getClassNames(item) {
    var selectedItem = this.state.selectedItem;
    var classNames = 'list-group-item ';
    if (selectedItem.title === item) {
      classNames += 'active';
    }
    return classNames;
  },

  handleSelectItem(title) {
    this.props.selectItem(title);
  }

});

module.exports = BallotList;