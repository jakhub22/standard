import React from 'react';
import { useTurshiltCtx } from '../pages/turshilt';

export default function TurshiltPage() {
  const { turshiltData, changeState } = useTurshiltCtx();

    return <div>TurshiltPage</div>;
}
