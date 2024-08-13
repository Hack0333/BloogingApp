import { useId } from "react";

function Select({ options = [], label, classname = "", ...props }, ref) {
  const id = useId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none
         focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
        ref={ref}
        id={id}
      >
        {options?.map((singleOprtion) => (
            <option key={singleOprtion} value={singleOprtion}>
                {singleOprtion}
            </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
