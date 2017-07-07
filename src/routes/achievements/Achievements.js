import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
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

  render() {
    const approvedAchievements = _.filter(this.props.achievements, 'approved');
    const achievementsByEmail = _.groupBy(approvedAchievements, 'emailAddress');
    return (
      <MuiThemeProvider>
        <List>
          {_.map(achievementsByEmail, (achievements, emailAddress) => (
            <ListItem
              primaryTogglesNestedList
              key={emailAddress}
              primaryText={<Badges emailAddress={emailAddress} achievements={achievements} />}
              nestedItems={_.map(achievements, (achievement, index) => (
                <ListItem
                  key={index}
                  leftAvatar={Badge({ achievement })}
                  primaryText={achievement.achievement}
                  secondaryText={formatExcelTime(achievement.timestamp)}
                />),
              )}
            />),
          )}
        </List>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Achievements);
