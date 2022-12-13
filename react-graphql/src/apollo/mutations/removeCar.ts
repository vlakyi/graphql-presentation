import { gql, useMutation, MutationTuple } from "@apollo/client";
// import { Car } from "../../types";
// import { GET_CARS, UseGetCarsOutput } from "../queries";

const REMOVE_CAR_MUTATION = gql`
  mutation removeCar($id: Float!) {
    removeCar(id: $id) {
      id
    }
  }
`;

interface RemoveCarVariables {
  id: number;
}

interface RemoveCarOutput {
  removeCar: {
    id: number;
  };
}

export const useRemoveCar = (): MutationTuple<
  RemoveCarOutput,
  RemoveCarVariables
> => {
  return useMutation(REMOVE_CAR_MUTATION, {
    refetchQueries: ["getCars"],
  });

  // return useMutation(REMOVE_CAR_MUTATION, {
  // update(cache, { data }) {
  //   const { id } = (data as RemoveCarOutput).removeCar;
  //   const result = cache.readQuery<UseGetCarsOutput>({
  //     query: GET_CARS,
  //   });
  //   if (result) {
  //     const cars = result.cars;
  //     cache.writeQuery<UseGetCarsOutput>({
  //       query: GET_CARS,
  //       data: {
  //         cars: cars.filter((car: Car) => car.id !== id.toString()),
  //       },
  //     });
  //   }
  // },
  // });
};
