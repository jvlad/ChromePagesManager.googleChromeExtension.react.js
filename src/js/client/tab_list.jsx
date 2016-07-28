var TabItem = require('./tab_item.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
        <ul style={this.getStyle(this.props.listIndex)}>
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
      /* jshint ignore:end */
    );
  },

  getStyle: function (listIndex) {
    const LIST_WIDTH = 300;

    function getLeftOffset() {
      return listIndex * LIST_WIDTH;
    }

    return {
      listStyle: "none",
      paddingLeft: 0,
      whiteSpace: "nowrap",
      overflowX: "hidden",
      textOverflow: "ellipsis",
      display: "inline-block",
      position: "absolute",
      top: "45px",
      bottom: 0,
      left: getLeftOffset() + "px",
      width: LIST_WIDTH
    }
  },

  getHeight: function() {
    return this.getDOMNode().offsetHeight;
  },

  getScrollTop: function() {
    return this.getDOMNode().scrollTop;
  },

  setScrollTop: function(val) {
    this.getDOMNode().scrollTop = val;
  }
});