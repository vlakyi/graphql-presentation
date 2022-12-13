import { Car } from "../types";
import { Input } from "./Input";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonLabel: string;
  defaultValues?: Partial<Car>;
}

export function CarForm({ handleSubmit, buttonLabel, defaultValues }: Props) {
  const licenses =
    defaultValues?.licenses?.map(({ licenseNo }) => licenseNo).toString() || "";

  return (
    <form
      className="flex flex-col items-start gap-4 mt-10"
      onSubmit={handleSubmit}
    >
      <Input
        label="Name"
        name="name"
        defaultValue={defaultValues?.name || ""}
      />
      <Input
        label="Brand"
        name="brand"
        defaultValue={defaultValues?.brand || ""}
      />
      <Input label="Licenses" name="licenses" defaultValue={licenses} />

      <button className="btn" type="submit">
        {buttonLabel}
      </button>
    </form>
  );
}
