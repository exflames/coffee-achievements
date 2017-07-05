/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List } from 'graphql';
import gsjson from 'google-spreadsheet-to-json';
import AchievementType from '../types/AchievementType';

const achievements = {
  type: new List(AchievementType),
  async resolve() {
    const spreadsheet = await gsjson({
      spreadsheetId: '1DfFkLq6YMpSIXGPCNs5ND718Ng4vVOmsI7WDk7hFY6c',
    });

    return spreadsheet;
  },
};

export default achievements;
