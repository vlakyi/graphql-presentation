import { gql, useMutation, MutationTuple } from "@apollo/client";
import { Car, CarInput } from "../../types";
import { CAR_FRAGMENT } from "../fragments";
// import { GET_CARS, UseGetCarsOutput } from "../queries";

const CREATE_CAR_MUTATION = gql`
  mutation createCar($createCarInput: CreateCarInput!) {
    createCar(createCarInput: $createCarInput) {
      ...CarFragment
    }
  }
  ${CAR_FRAGMENT}
`;

interface CreateCarVariables {
  createCarInput: CarInput;
}

interface CreateCarOutput {
  createCar: Car;
}

export const useCreateCar = (): MutationTuple<
  CreateCarOutput,
  CreateCarVariables
> => {
  return useMutation(CREATE_CAR_MUTATION);

  // return useMutation(CREATE_CAR_MUTATION, {
  //   update(cache, { data }) {
  //     const car = (data as CreateCarOutput).createCar;
  //     const result = cache.readQuery<UseGetCarsOutput>({
  //       query: GET_CARS,
  //     });

  //     if (result) {
  //       const cars = result.cars;
  //       cache.writeQuery<UseGetCarsOutput>({
  //         query: GET_CARS,
  //         data: {
  //           cars: [...cars, car],
  //         },
  //       });
  //     }
  //   },
  // });
};
