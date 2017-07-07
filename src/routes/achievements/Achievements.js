import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { parse, format } from 'date-fns';
import Badge from './Badge';
import Badges from './Badges';
import s from './Achievements.css';

function formatExcelTime(time) {
  const unixTime = (time - 25569) * 86400000;
  const date = parse(unixTime);
  const localTime = new Date(date.getTime() + ((new Date()).getTimezoneOffset() * 60000));
  return format(localTime, 'MMM D, YYYY');
}

function navigate(target) {
  window.location = `http://go.thumbtack.io/${target}`;
}

class Achievements extends React.Component {
  static propTypes = {
    achievements: PropTypes.arrayOf(
      PropTypes.shape({
        timestamp: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        achievement: PropTypes.string.isRequired,
        requestUrl: PropTypes.string,
        additionalNotes: PropTypes.string,
        approved: PropTypes.bool,
      }),
    ).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.navigateToMakeCoffee = _.bind(navigate, this, 'make-coffee');
    this.navigateToForm = _.bind(navigate, this, 'coffee-achievement-form');
    this.navigateToFAQ = _.bind(navigate, this, 'coffee-achievements-faq');
  }

  render() {
    const achievementPairs = _(this.props.achievements)
      .filter('approved')
      .groupBy('emailAddress')
      .toPairs()
      .sortBy(pair => _(pair[1]).map('timestamp').max())
      .reverse()
      .value();

    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Coffee Achievements" onLeftIconButtonTouchTap={() => this.setState({ open: true })} />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <Subheader>go/coffee-achievements</Subheader>
            <MenuItem onTouchTap={this.navigateToMakeCoffee}>Getting Started</MenuItem>
            <MenuItem onTouchTap={this.navigateToForm}>Submit Form</MenuItem>
            <MenuItem onTouchTap={this.navigateToFAQ}>FAQ</MenuItem>
          </Drawer>
          <List>
            {_.map(achievementPairs, ([emailAddress, achievements]) => [
              <ListItem
                primaryTogglesNestedList
                key={emailAddress}
                primaryText={<Badges emailAddress={emailAddress} achievements={achievements} />}
                nestedItems={_.flatMap(achievements, (achievement, index) => [
                  <Divider inset key={`${index}-divider`} />,
                  <ListItem
                    key={index}
                    leftAvatar={Badge({ achievement })}
                    primaryText={achievement.achievement}
                    secondaryText={formatExcelTime(achievement.timestamp)}
                  />,
                ])}
              />,
              <Divider />,
            ])}
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(normalizeCss, s)(Achievements);
