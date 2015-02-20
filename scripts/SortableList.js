'use strict';

var React = require('react');
var _ = require('lodash');
var ReactGridLayout = require('react-grid-layout');
require('style!css!../css/styles.css');

var SortableList = React.createClass({

  render() {
    return (
      <ReactGridLayout
        className="list-group"
        margin={[0, -1]}
        cols={1}
        rowHeight={42}
        isResizable={false}
        onDragStop={this.handleDragStop}
        onDragStart={this.handleDragStart}
      >
        {this.generateItems()}
      </ReactGridLayout>
    );
  },

  generateItems() {
    return _.map(this.props.items, function(title, i) {
      var className = 'list-group-item ';
      if (this.props.selectedItem.title === title) {className += 'active'}
      return <div className={className} key={title} _grid={{x: 0, y: i, w: 1, h: 1}}>
        <kbd>{i + 1}</kbd> {title}
      </div>
    }.bind(this))
  },

  handleDragStop(layout) {
    var titles = _.pluck(_.sortBy(layout, 'y'), 'i');
    this.props.updateItems(titles);
  },

  handleDragStart() {
    var layoutItem = arguments[2];
    this.props.selectItem(layoutItem['i']);
  }

});

module.exports = SortableList;