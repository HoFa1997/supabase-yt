import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export const BackComponent = () => {
  const { back } = useRouter();
  return (
    <div className="w-screen flex justify-start items-center p-2">
      <button onClick={() => back()}>
        <ArrowUturnLeftIcon className="w-8 h-8" />
      </button>
    </div>
  );
};
