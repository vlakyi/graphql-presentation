import { useUpdateCar } from "../apollo/mutations";
import { Car } from "../types";
import { CarForm } from "./CarForm";

interface Props {
  car: Car;
  onClose: () => void;
}

export function UpdateCarModal({ car, onClose }: Props) {
  const [updateCar] = useUpdateCar();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log({ formData });

    try {
      await updateCar({
        variables: {
          id: Number(car.id),
          updateCarInput: {
            name: formData.get("name") as string,
            brand: formData.get("brand") as string,
            licenses: (formData.get("licenses") as string).split(","),
          },
        },
      });

      console.log(`Car ${car.id} updated successfully`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="car-update-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={onClose}
            htmlFor="car-update-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Update Car</h3>
          <CarForm
            handleSubmit={handleSubmit}
            buttonLabel="Update Car"
            defaultValues={car}
          />
        </div>
      </div>
    </div>
  );
}
