import { Filter } from '#/context/FilterContext';
import { FC } from 'react';
import { FilterBadge } from '../filterBadge';

import Overlay from '../overlay';

export interface FilterListProps {
  filters: Filter[];
}

export const ListFilters: FC<FilterListProps> = ({ filters }) => {
  return (
    <Overlay>
      <section className="flex gap-[10px] flex-wrap">
        {filters.map(({ value, id }) => (
          <FilterBadge key={id} text={value} />
        ))}
      </section>
    </Overlay>
  );
};
