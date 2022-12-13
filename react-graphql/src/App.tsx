import { ApolloError } from "@apollo/client";
import { useState } from "react";
import { useCreateCar } from "./apollo/mutations";
import { useGetCars } from "./apollo/queries";
import { CarCardList } from "./components/CarCardList";
import { CarForm } from "./components/CarForm";
import { UpdateCarModal } from "./components/UpdateCarModal";
import { Car } from "./types";

function App() {
  const [carToUpdate, setCarToUpdate] = useState<Car | null>(null);

  const openUpdateCardModal = (car: Car) => {
    setCarToUpdate(car);
  };

  const closeUpdateCardModal = () => {
    setCarToUpdate(null);
  };

  const { data, loading, refetch } = useGetCars();
  const [createCar] = useCreateCar();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      await createCar({
        variables: {
          createCarInput: {
            name: formData.get("name") as string,
            brand: formData.get("brand") as string,
            licenses: (formData.get("licenses") as string).split(","),
          },
        },
      });

      await refetch();
    } catch (err) {
      const error = err as ApolloError;
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {!data?.cars.length && <div className="my-4">No cars found</div>}

      <CarCardList
        cars={data?.cars ?? []}
        openUpdateCardModal={openUpdateCardModal}
      />

      <CarForm handleSubmit={handleSubmit} buttonLabel="Create Car" />

      {carToUpdate && (
        <UpdateCarModal car={carToUpdate} onClose={closeUpdateCardModal} />
      )}
    </div>
  );
}

export default App;
