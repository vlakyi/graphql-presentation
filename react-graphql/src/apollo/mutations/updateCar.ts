import { gql, useMutation, MutationTuple } from "@apollo/client";
import { Car, CarInput } from "../../types";
import { CAR_FRAGMENT } from "../fragments";

const UPDATE_CAR_MUTATION = gql`
  mutation updateCar($id: Float!, $updateCarInput: UpdateCarInput!) {
    updateCar(id: $id, updateCarInput: $updateCarInput) {
      ...CarFragment
    }
  }
  ${CAR_FRAGMENT}
`;

interface UpdateCarVariables {
  id: number;
  updateCarInput: CarInput;
}

interface UpdateCarOutput {
  updateCar: Car;
}

export const useUpdateCar = (): MutationTuple<
  UpdateCarOutput,
  UpdateCarVariables
> => {
  return useMutation(UPDATE_CAR_MUTATION);
};
