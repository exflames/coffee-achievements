/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const AchievementType = new ObjectType({
  name: 'Achievement',
  fields: {
    timestamp: { type: new NonNull(FloatType) },
    emailAddress: { type: new NonNull(StringType) },
    achievement: { type: new NonNull(StringType) },
    requestUrl: { type: StringType },
    additionalNotes: { type: StringType },
    approved: { type: BooleanType },
  },
});

export default AchievementType;
