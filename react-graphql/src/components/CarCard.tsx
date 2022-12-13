import { useRemoveCar } from "../apollo/mutations/removeCar";
import { Car } from "../types";

interface Props {
  car: Car;
  openUpdateCardModal: (car: Car) => void;
}

export function CarCard({ car, openUpdateCardModal }: Props) {
  const { id, name, brand, licenses } = car;

  const [removeCar] = useRemoveCar();

  const handleRemove = async () => {
    try {
      await removeCar({
        variables: {
          id: Number(id),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card w-96 bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div>ID: {id}</div>
        <div>Brand: {brand}</div>
        <div>Licenses: </div>
        <ul>
          {licenses.map(({ id, licenseNo }) => (
            <li key={id}>
              <div>License Number: {licenseNo}</div>
            </li>
          ))}
        </ul>
        <div className="card-actions justify-between">
          <button className="btn" onClick={handleRemove}>
            Remove
          </button>

          {/* The button to open modal */}
          <label
            onClick={() => openUpdateCardModal(car)}
            htmlFor="car-update-modal"
            className="btn btn-warning"
          >
            Update
          </label>
        </div>
      </div>
    </div>
  );
}
