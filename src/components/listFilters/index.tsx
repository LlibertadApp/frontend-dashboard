// ListFilters.jsx
import React from "react";
import { Filter } from "../../context/FilterContext";
import { FC } from "react";
import { FilterBadge } from "../filterBadge";

export interface FilterListProps {
  filters: Filter[];
}

export const ListFilters: FC<FilterListProps> = ({ filters }) => {
  return (
    <section className="flex gap-[10px] flex-wrap">
      {filters.map(
        ({ value, name, id }) =>
          value && <FilterBadge key={id} text={`${name}: ${value}`} />
      )}
    </section>
  );
};
