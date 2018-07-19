import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import i18n from 'i18n';
import { setCompareMode } from 'state/historyviewer/HistoryViewerActions';
import classNames from 'classnames';

class HistoryViewerCompareWarning extends Component {
  constructor(props) {
    super(props);

    this.handleDismissCompare = this.handleDismissCompare.bind(this);
  }

  handleDismissCompare() {
    this.props.onDismissCompare();
  }

  /**
   * Renders a notice indicating the user is in compare mode (iff compare mode is active)
   *
   * @returns {string}
   */
  render() {
    const { compareMode, fixed } = this.props;

    if (!compareMode) {
      return null;
    }

    const classes = ['history-viewer__compare-notice'];

    if (fixed) {
      classes.push('fixed');
    }

    return (
      <div className={classNames(classes)}>
        <span className="notice-message">
          <strong>{i18n._t('HistoryViewer.COMPARE_MODE', 'Compare mode')}: </strong>
          {i18n._t('HistoryViewer.SELECT_PROMPT', 'Select two versions')}
        </span>
        <button className="btn dismiss-button font-icon-cancel" onClick={this.handleDismissCompare}>
          {i18n._t('HistoryViewer.EXIT', 'Exit')}
        </button>
      </div>
    );
  }
}

HistoryViewerCompareWarning.propTypes = {
  compareMode: PropTypes.bool.isRequired,
  fixed: PropTypes.bool.isRequired,
};

HistoryViewerCompareWarning.defaultProps = {
  fixed: false,
};

function mapStateToProps(state) {
  const {
    compareMode,
  } = state.versionedAdmin.historyViewer;

  return {
    compareMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDismissCompare() {
      dispatch(setCompareMode(false));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryViewerCompareWarning);
