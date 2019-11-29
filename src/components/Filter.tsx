import React from "react";
import WindowedSelect from "react-windowed-select";
import { OptionTypeBase } from "react-select";

interface Props {
  options: string[];
  label: string;
  selected: string[];
  handleSelected: (values: string[]) => void;
}

const Filter: React.FC<Props> = (props: Props) => {
  const { options, label, selected, handleSelected } = props;

  return (
    <>
      <h4>{label}</h4>
      <WindowedSelect
        isMulti
        options={options.map(str2option)}
        value={selected.map(str2option)}
        isDisabled={options.length === 0}
        classNamePrefix="select"
        onChange={(value: any) =>
          handleSelected(value ? value.map(option2str) : [])
        }
      />
    </>
  );
};

function str2option(option: string): OptionTypeBase {
  return {
    value: option,
    label: option
  };
}

function option2str(option: OptionTypeBase): string {
  return option.value;
}

export default Filter;
