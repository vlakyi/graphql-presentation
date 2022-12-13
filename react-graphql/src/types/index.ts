interface CarInput {
  name: string;
  brand: string;
  licenses: string[];
}

interface Car {
  id: string;
  name: string;
  brand: string;
  licenses: License[];
}

interface License {
  id: string;
  licenseNo: string;
  cars: Car[];
}

export type { CarInput, Car, License };
