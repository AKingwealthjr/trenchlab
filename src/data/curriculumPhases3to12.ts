import { Phase } from '../types';
import { PHASES_3_TO_6 } from './curriculumPhases3to6';
import { PHASES_7_TO_12 } from './curriculumPhases7to12';

export const PHASES_3_TO_12: Phase[] = [
  ...PHASES_3_TO_6,
  ...PHASES_7_TO_12
];
