import { gql, TypedDocumentNode } from "@apollo/client";
import { LICENSE_FRAGMENT } from "./LicenseFragment";

export const CAR_FRAGMENT: TypedDocumentNode = gql`
  fragment CarFragment on Car {
    id
    name
    brand
    licenses {
      ...LicenseFragment
    }
  }
  ${LICENSE_FRAGMENT}
`;
