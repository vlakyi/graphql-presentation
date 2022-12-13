import { gql, useQuery } from "@apollo/client";
import { Car } from "../../types";
import { CAR_FRAGMENT } from "../fragments";

export const GET_CARS = gql`
  query getCars {
    cars {
      ...CarFragment
    }
  }
  ${CAR_FRAGMENT}
`;

export interface UseGetCarsOutput {
  cars: Car[];
}

export const useGetCars = () => {
  return useQuery<UseGetCarsOutput>(GET_CARS);
};
