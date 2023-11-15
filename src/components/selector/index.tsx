import { Autocomplete, TextField } from "@mui/material";
import Arrow from "/assets/icons/arrow-continue.svg";

interface ISelectorProps {
  onChange: (e: any) => void;
  label: string;
  options: { key: string; label: string }[];
  value: string;
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
  return (
    <Autocomplete
      value={options.find((option) => option.key === value) || null}
      onChange={(e, newValue) =>
        onChange({ target: { value: newValue?.key || "" } })
      }
      options={options}
      getOptionLabel={(option) => option.label}
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
