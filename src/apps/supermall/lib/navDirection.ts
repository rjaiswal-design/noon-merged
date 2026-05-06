import { createContext, useContext } from 'react';
import type { PageDirection } from './transitions';

export const NavDirectionContext = createContext<PageDirection>('forward');

export function useNavDirection(): PageDirection {
  return useContext(NavDirectionContext);
}
