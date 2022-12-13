import { Car } from "../types";
import { CarCard } from "./CarCard";

interface Props {
  cars: Car[];
  openUpdateCardModal: (car: Car) => void;
}

export function CarCardList({ cars, openUpdateCardModal }: Props) {
  return (
    <ul className="flex flex-wrap items-center gap-4 justify-around">
      {cars.map((car: Car) => (
        <li key={car.id}>
          <CarCard car={car} openUpdateCardModal={openUpdateCardModal} />
        </li>
      ))}
    </ul>
  );
}
