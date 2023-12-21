import {useState} from "react";

interface IProps<T, K extends keyof T, K2 extends keyof T> {
  choices: T[];
  value: K;
  label: K2;
  onChange?: (k: T[K]) => void;
  name: string;
  choice?: T[K];
}

export function FilterAccordion<T, K extends keyof T, K2 extends keyof T>(props : IProps<T, K, K2>) {
  let { choices, value, label, onChange, name, choice } = props;
  let [open, setOpen] = useState(true);

  let list = (
    <ul className={"list-none pl-0"}>
      {choices.map(r => {
        let checked = r[value] === choice;
        return (
          <li key={`${r[value]}`} className={"font-normal text-lg " + (checked ? "text-[#3EAFC8]" : "")}>
            <input type="checkbox"
                   name={name} id={`${name}_${r[value]}`}
                   className={`${checked ? `checked:bg-[#8bb7f0] hover:bg-[#8bb7f0]` : 'bg-[#D9D9D9] hover:bg-gray-500'} mb-1.5 outline-none`}
                   checked={checked}
                   onChange={() => {
                    onChange?.(r[value]);
                  }} />
            <label htmlFor={`${name}_${r[value]}`} className={`pl-2 ${checked ? 'font-bold' : ''}`}>
              {`${r[label]}`}
            </label>
          </li>
        )
      })}
    </ul>
  );
  return (
    <>
      <div>
        <div className={"text-xl font-semibold"}>
          {name}
        </div>
        {open && list}
      </div>
    </>
  )
}
