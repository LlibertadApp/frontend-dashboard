import { Autocomplete, TextField } from "@mui/material";
import Arrow from "/assets/icons/arrow-continue.svg";
import { KeyValueOrNull } from "#/pages/filter-results";
import { Key } from "react";

interface ISelectorProps {
  onChange: (e: any) => void;
  label: string;
  options: { key: Key; label: string }[];
  value: KeyValueOrNull;
}

const ArrowIcon = ({ className }: { className: string }) => {
  return (
    <div className="mr-4 w-10 h-10 relative">
      <div className={className}>
        <img src={Arrow} className="rotate-90" alt="Arrow" />
      </div>
    </div>
  );
};

export function Selector({ onChange, label, options, value }: ISelectorProps) {
  console.log(value)
  return (
    <Autocomplete
      value={value}
      onChange={(e, newValue) => {
        console.log('new value', newValue)
        onChange(newValue)
      }
      }
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          fullWidth
          style={{ borderRadius: "15px" }}
        />
      )}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      className="select"
      renderOption={(props, option) => (
        <li {...props}>
          <span>{option.label}</span>
        </li>
      )}
    />
  );
}
