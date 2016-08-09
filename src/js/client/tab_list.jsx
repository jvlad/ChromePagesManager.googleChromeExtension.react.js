var TabItem = require('./tab_item.jsx');
var stringScore = require('../../../lib/string_score');
var tabFilter = require('./tab_filter')(stringScore);

// todo consider to refactor
const LIST_WIDTH = 300;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      tabs: [],
      tabProvider: null
    }
  },
  
  render: function() {
    var tabsToRender = this.filteredTabs();  
    return (
      /* jshint ignore:start */
      <div>
        <p className="listName"
           style={this.getListNameStyle(this.props.listIndex)}>{this.props.name}</p>

        <ul ref='listContent'
            style={this.getListContentStyle(this.props.listIndex)}>
            {tabsToRender.map(function(tab, i) {
              return <TabItem
                tab={tab}
                key={tab.id}
                filter={this.props.filter}
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

  componentDidMount: function () {
    this.refreshTabs();
  },

  refreshTabs: function() {
    this.props.tabProvider.query(this.props.searchAllWindows)
      .then(function(tabs) {
        this.setState({tabs: tabs});
      }.bind(this));
  },

  // We're calculating this on the fly each time instead of caching
  // it in the state because it is very much fast enough, and
  // simplifies some race-y areas of the component's lifecycle.
  filteredTabs: function() {
    var filter = this.props.filter;
    if (filter.trim().length) {
      return tabFilter(filter, this.state.tabs)
        .map(function(result) {
          return result.tab;
        });
    } else {
      return this.state.tabs;
    }
  },

  modifySelected: function(change) {
    var filteredTabs = this.filteredTabs();
    if (!filteredTabs.length) return;

    var currentIndex = filteredTabs.indexOf(this.getSelected());
    var newIndex = currentIndex + change;
    if (newIndex < 0) return false;
    if (newIndex >= filteredTabs.length) return false;
    var newTab = filteredTabs[newIndex];
    return true;
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