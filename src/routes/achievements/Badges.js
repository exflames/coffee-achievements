import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Badge from './Badge';
import Name from './Name';

export default function Badges(props) {
  const { emailAddress, achievements } = props;
  return (
    <div>
      <Name emailAddress={emailAddress} />
      {_.map(achievements, achievement =>
        <Badge style={{ marginLeft: 16 }} key={achievement.timestamp} achievement={achievement} />,
      )}
    </div>
  );
}

Badges.propTypes = {
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
  emailAddress: PropTypes.string.isRequired,
};
