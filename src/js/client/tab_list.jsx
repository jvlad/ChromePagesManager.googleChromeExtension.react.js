var TabItem = require('./tab_item.jsx');

const LIST_WIDTH = 300;

module.exports = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <div>
        <p className="listName" style={this.getListNameStyle(this.props.listIndex)}>{this.props.name}</p>
        <ul ref='listContent' style={this.getListContentStyle(this.props.listIndex)}>
          {this.props.tabs.map(function(tab, i) {
            return <TabItem tab={tab} key={tab.id} filter={this.props.filter}
              selected={this.props.selectedTab === tab}
              changeSelected={this.props.changeSelected}
              activateSelected={this.props.activateSelected}
              closeSelected={this.props.closeSelected}
              containerScrollTop={this.getScrollTop()}
              containerHeight={this.getHeight()}
              setContainerScrollTop={this.setScrollTop} />;
          }.bind(this))}
        </ul>
        </div>
      /* jshint ignore:end */
    );
  },

  getLeftOffset: function (listIndex) {
    return listIndex * LIST_WIDTH;
  },

  getListNameStyle: function (listIndex) {
    return {
      paddingLeft: 7 + "px",
      position: "absolute",
      top: 45 + "px",
      left: this.getLeftOffset(listIndex) + "px",
      width: LIST_WIDTH
    }
  },

  getListContentStyle: function (listIndex) {
    return {
      listStyle: "none",
      paddingLeft: 0,
      whiteSpace: "nowrap",
      overflowX: "hidden",
      textOverflow: "ellipsis",
      display: "inline-block",
      position: "absolute",
      top: 65 + "px",
      bottom: 0,
      left: this.getLeftOffset(listIndex) + "px",
      width: LIST_WIDTH
    }
  },

  getHeight: function() {
    return this.refs.listContent.getDOMNode().offsetHeight;
  },

  getScrollTop: function() {
    return this.refs.listContent.getDOMNode().scrollTop;
  },

  setScrollTop: function(val) {
    this.refs.listContent.getDOMNode().scrollTop = val;
  }
});