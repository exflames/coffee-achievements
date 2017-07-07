import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

/* eslint no-bitwise: ['error', { 'allow': ['&', '<<']}] */

function hashCode(str) {
  // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '#00000'.substring(0, 7 - c.length) + c;
}

export default function Name(props) {
  const { emailAddress } = props;
  const handle = emailAddress.split('@')[0];
  const color = intToRGB(hashCode(handle));
  return (
    <Chip style={{ display: 'inline-flex', cursor: 'inherit' }}>
      <Avatar backgroundColor={color}>{handle[0].toUpperCase()}</Avatar>{handle}
    </Chip>
  );
}

Name.propTypes = {
  emailAddress: PropTypes.string.isRequired,
};
