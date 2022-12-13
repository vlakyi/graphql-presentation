import { gql, useQuery } from "@apollo/client";
import { Car } from "../../types";
import { CAR_FRAGMENT } from "../fragments";

const GET_CAR_BY_ID = gql`
  query getCar($id: ID!) {
    car(id: $id) {
      ...CarFragment
    }
  }
  ${CAR_FRAGMENT}
`;

interface UseGetCarByIdOutput {
  cars: Car[];
}

export const useGetCarById = () => {
  return useQuery<UseGetCarByIdOutput>(GET_CAR_BY_ID);
};
