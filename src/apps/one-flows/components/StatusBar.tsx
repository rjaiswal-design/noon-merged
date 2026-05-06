import cap from "../assets/cap.svg";
import wifi from "../assets/wifi.svg";
import cellular from "../assets/cellular.svg";

/**
 * iPhone-style status bar (9:41 / cellular / wifi / battery). Absolutely
 * positioned at the top-left of its parent — the parent must be relative.
 */
export default function StatusBar() {
  return (
    <div className="absolute h-11 left-0 top-0 w-[375px] z-10">
      <div className="absolute h-5 left-5 top-1.5 w-14">
        <p className="-translate-x-1/2 absolute font-semibold leading-none left-7 text-b14 text-black text-center top-[calc(50%-3.5px)] w-14">
          9:41
        </p>
      </div>
      <div className="absolute inset-[40.15%_17.07%_35.61%_78.4%]">
        <img alt="" className="absolute block inset-0 w-full h-full" src={cellular} />
      </div>
      <div className="absolute inset-[39.39%_11.64%_35.61%_84.27%]">
        <img alt="" className="absolute block inset-0 w-full h-full" src={wifi} />
      </div>
      <div className="absolute right-3.5 top-4">
        <div className="absolute border border-black border-solid h-3 opacity-35 right-0.5 rounded-4 top-0 w-5" />
        <div className="absolute h-1 right-0 top-1 w-px">
          <img alt="" className="absolute block inset-0 w-full h-full" src={cap} />
        </div>
        <div className="absolute bg-black h-2 right-1 rounded-4 top-0.5 w-4" />
      </div>
    </div>
  );
}
