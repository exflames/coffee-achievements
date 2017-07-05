/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Achievements.css';

class Achievements extends React.Component {
  static propTypes = {
    achievements: PropTypes.arrayOf(PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      emailAddress: PropTypes.string.isRequired,
      achievement: PropTypes.string.isRequired,
      requestUrl: PropTypes.string,
      additionalNotes: PropTypes.string,
      approved: PropTypes.bool,
    })).isRequired,
  };

  render() {
    return (
      <table>
        <tbody>
          {this.props.achievements.map(item => (
            <tr key={item.timestamp}>
              <td>{item.timestamp}</td>
              <td>{item.emailAddress}</td>
              <td>{item.achievement}</td>
              <td>{item.requestUrl}</td>
              <td>{item.additionalNotes}</td>
              <td>{item.approved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default withStyles(s)(Achievements);
