/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Achievements from './Achievements';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{achievements{timestamp,emailAddress,achievement,requestUrl,additionalNotes,approved}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.achievements) throw new Error('Failed to load achievements.');
  return {
    chunks: ['achievements'],
    title: 'Coffee Achievements',
    component: <Achievements achievements={data.achievements} />,
  };
}

export default action;
