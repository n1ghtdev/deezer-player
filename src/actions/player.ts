import { types } from '@typings/player';

export function playAction({
  startedAt,
  duration,
}: {
  startedAt: number;
  duration: number;
}) {
  return {
    type: types.PLAY,
    payload: {
      startedAt,
      duration,
    },
  } as const;
}

export function pauseAction({ pausedAt }: { pausedAt: number }) {
  return {
    type: types.PAUSE,
    payload: {
      pausedAt,
    },
  } as const;
}
export type Actions = ReturnType<typeof playAction | typeof pauseAction>;
