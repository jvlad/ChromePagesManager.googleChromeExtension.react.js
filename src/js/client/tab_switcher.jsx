var tabBroker = require('./tab_broker')(chrome);

var TabSearchBox = require('./tab_search_box.jsx');
var TabList = require('./tab_list.jsx');
var StatusBar = require('./status_bar.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    // TODO: move into a model
    const SEARCH_ALL_WINDOWS_BY_DEFAULT = true;
    var searchAllWindows = localStorage.getItem('searchAllWindows');
    try {
      searchAllWindows = searchAllWindows ? JSON.parse(searchAllWindows) : SEARCH_ALL_WINDOWS_BY_DEFAULT;
    } catch (error) {
      searchAllWindows = SEARCH_ALL_WINDOWS_BY_DEFAULT;
    }

    return {
      //todo if there is saved filterState in the local storage, selectAll (keep cursor next to the end of filter input string) in the input area on tabSwitcher invoked
      filter: '',
      selected: null,
      searchAllWindows: searchAllWindows
    };
  },

  componentDidMount: function() {
    window.onblur = this.close;
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <div>
        <TabSearchBox
          filter={this.state.filter}
          exit={this.close}
          changeFilter={this.changeFilter}
          activateSelected={this.activateSelected}
        />
        <TabList
          listIndex={0}
          name="Open Tabs"
          filter={this.state.filter}
          selectedTab={this.getSelected()}
          changeSelected={this.changeSelected}
          activateSelected={this.activateSelected}
          searchAllWindows={this.state.searchAllWindows}/>
      </div>
      /* jshint ignore:end */
    );
  },

  getSelected: function() {
    return this.state.selected;
  },

  activateSelected: function() {
    var selected = this.getSelected();
    if (selected) {
      tabBroker.switchTo(selected);
      this.close();
    }
  },

  changeFilter: function(newFilter) {
    this.setState({filter: newFilter, selected: null});
    //todo save filter state to LocalStorage
  },

  //todo rename to setSelected
  changeSelected: function(tab) {
    this.setState({selected: tab});
  },

  changeSearchAllWindows: function(value) {
    // TODO: move into a model
    localStorage.setItem('searchAllWindows', JSON.stringify(value));
    this.setState({searchAllWindows: value}, this.refreshTabs);
  },

  close: function() {
    //todo uncomment
    // window.close();
  }
});
