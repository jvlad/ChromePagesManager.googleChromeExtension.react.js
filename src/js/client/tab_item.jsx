var stringSpanner = require('./string_spanner');

var MATCH_START = '<span class="match">';
var MATCH_END = '</span>';

module.exports = React.createClass({
  render: function () {
    /* jshint ignore:start */
    var closeButton = this.props.selected ?
      <div className='close-button' onClick={this.onClickCloseButton}>&times; </div> : null;

    return (
      <li className={this.className() }
        onClick={this.onClick} onMouseEnter={this.onMouseEnter}>
        <div>
          <div className='bkg' ref='favIcon'/>
          <span className='title'
            dangerouslySetInnerHTML={{ __html: this.tabTitle(this.props.tab) }} />
        </div>
        <div className='url'
          dangerouslySetInnerHTML={{ __html: this.tabUrl(this.props.tab) }} />
        {closeButton}
      </li>
    );
    /* jshint ignore:end */
  },

  componentDidMount: function () {
    var item = this.props.tab;
    var type = this.props.type;
    this.refs.favIcon.getDOMNode().style.backgroundImage = "url(" + this.getIconUrl(item, type) + ")";
  },

  componentDidUpdate: function () {
    if (this.props.selected) {
      this.ensureVisible();
    }
  },

  ensureVisible: function () {
    var node = this.getDOMNode();
    var myTop = node.offsetTop;
    var myBottom = myTop + node.offsetHeight;
    var containerScrollTop = this.props.containerScrollTop;
    var containerScrollBottom = containerScrollTop + this.props.containerHeight;

    if (myTop < containerScrollTop) this.props.setContainerScrollTop(myTop);
    if (myBottom > containerScrollBottom)
      this.props.setContainerScrollTop(containerScrollTop + myBottom - containerScrollBottom);
  },

  getIconUrl: function (item, type) {
    if (type === "openTab" && !isChromeInternalPage(item.favIconUrl)) {
      return item.favIconUrl;
    };
    if (type === "bookmark" && !isChromeInternalPage(item.url)) {
      return "https://www.google.com/s2/favicons?domain=" + item.url;
    };
    return "https://www.google.com/s2/favicons?domain=https://www.google.com/chrome"

    function isChromeInternalPage(url){
      var chromeInternalPageURLPrefix = "chrome://";
      return url.substring(0, chromeInternalPageURLPrefix.length) === chromeInternalPageURLPrefix; 
    }
  },

  className: function () {
    return this.props.selected ? "selected" : "";
  },

  tabTitle: function (tab) {
    return stringSpanner(tab.title, this.props.filter, MATCH_START, MATCH_END);
  },

  tabUrl: function (tab) {
    return stringSpanner(tab.url, this.props.filter, MATCH_START, MATCH_END);
  },

  onMouseEnter: function (evt) {
    this.props.changeSelected(this.props.tab);
  },

  onClick: function (evt) {
    this.props.activateSelected();
  },

  onClickCloseButton: function (evt) {
    evt.stopPropagation();
    this.props.closeSelected();
  }
});
