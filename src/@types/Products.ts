import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "@firebase/firestore";

export interface Product {
  id?: string;
  amount: number;
  createdOn: Date;
  createBy: string;
  descriptionProduct: string;
  image: string;
  pathServer: string;
  nameProduct: string;
  updateOn: Date;
}
type FirebaseDate = {
  toDate(): Date;
};
export class ClassProduct implements Product {
  amount;
  createdOn;
  createBy;
  descriptionProduct;
  image;
  pathServer;
  nameProduct;
  updateOn;
  constructor(
    amount: number,
    createdOn: FirebaseDate,
    createBy: string,
    descriptionProduct: string,
    image: string,
    pathServer: string,
    nameProduct: string,
    updateOn: FirebaseDate
  ) {
    this.amount = amount;
    this.createdOn = createdOn.toDate();
    this.createBy = createBy;
    this.descriptionProduct = descriptionProduct;
    this.image = image;
    this.pathServer = pathServer;
    this.nameProduct = nameProduct;
    this.updateOn = updateOn.toDate();
  }

  toString() {
    return "";
  }
}
export const productsConverter = {
  toFirestore: (product: Product) => {
    return {
      amount: product.amount,
      createdOn: product.createdOn,
      createBy: product.createBy,
      descriptionProduct: product.descriptionProduct,
      image: product.image,
      pathServer: product.pathServer,
      nameProduct: product.nameProduct,
      updateOn: product.updateOn,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new ClassProduct(
      data.amount,
      data.createdOn,
      data.createBy,
      data.descriptionProduct,
      data.image,
      data.pathServer,
      data.nameProduct,
      data.updateOn
    );
  },
};
export type UpdateProduct = {
  nameProduct: string;
  descriptionProduct: string;
  updateOn: Date;
  amount: number;
  image?: string;
  pathServer?: string;
};

export type FormData = {
  image: FileList | null;
  amount: number;
  descriptionProduct: string;
  nameProduct: string;
  updateOn: Date;
};
export type CurrentProduct = {
  id: string;
  pathServer: string;
};
export type PropsForm = {
  productSelected: CurrentProduct;
  success: () => void;
};
export type img = {
  pathServer: string;
  downloadURL: string;
};
