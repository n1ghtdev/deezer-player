import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBackward,
  faForward,
  faPlay,
  faList,
  faVolumeUp,
  faVolumeDown,
  faVolumeOff,
  faVolumeMute,
  faSearch,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

export function configureIcons() {
  library.add(
    faBackward,
    faForward,
    faPlay,
    faList,
    faVolumeDown,
    faVolumeOff,
    faVolumeUp,
    faVolumeMute,
    faSearch,
    faPause,
  );
}
