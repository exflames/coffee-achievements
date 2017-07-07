import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import FontAwesome from 'react-fontawesome';
import { blue500, green500, amber500 } from 'material-ui/styles/colors';

const DIFFICULTY = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
};

const ACHIEVEMENT_ICONS = {
  'Order on a Monday': {
    text: 'M',
    difficulty: DIFFICULTY.EASY,
  },
  'Order on a native app': {
    fa_icon: 'mobile',
    difficulty: DIFFICULTY.EASY,
  },
  'Deliver on a Wednesday': {
    text: 'W',
    difficulty: DIFFICULTY.EASY,
  },
  'Order from someone with a pet': {
    fa_icon: 'paw',
    difficulty: DIFFICULTY.MEDIUM,
  },
  'Deliver to someone who has lived in a different country': {
    fa_icon: 'globe',
    difficulty: DIFFICULTY.MEDIUM,
  },
  'Order to a meeting': {
    fa_icon: 'users',
    difficulty: DIFFICULTY.MEDIUM,
  },
  'Deliver to a meeting': {
    fa_icon: 'truck',
    difficulty: DIFFICULTY.MEDIUM,
  },
  'Order and deliver on the same day': {
    text: '2x',
    difficulty: DIFFICULTY.HARD,
  },
  'Host a coffee pop-up': {
    fa_icon: 'coffee',
    difficulty: DIFFICULTY.HARD,
  },
  'Deliver to a new employee on their first week': {
    fa_icon: 'user',
    difficulty: DIFFICULTY.HARD,
  },
};

const DIFFICULTY_COLORS = {};
DIFFICULTY_COLORS[DIFFICULTY.EASY] = blue500;
DIFFICULTY_COLORS[DIFFICULTY.MEDIUM] = green500;
DIFFICULTY_COLORS[DIFFICULTY.HARD] = amber500;

export default function Badge(props) {
  const { achievement, style } = props;
  const glyph = ACHIEVEMENT_ICONS[achievement.achievement];

  return (
    <Avatar style={style} backgroundColor={DIFFICULTY_COLORS[glyph.difficulty]}>
      {glyph.text || <FontAwesome name={glyph.fa_icon} />}
    </Avatar>
  );
}

Badge.defaultProps = {
  style: {},
};

Badge.propTypes = {
  achievement: PropTypes.shape({
    timestamp: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    achievement: PropTypes.string.isRequired,
    requestUrl: PropTypes.string,
    additionalNotes: PropTypes.string,
    approved: PropTypes.bool,
  }).isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
