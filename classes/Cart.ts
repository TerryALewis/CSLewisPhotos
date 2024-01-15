export class CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  imageTitle: string;
  imageSize: string;

  constructor(
    id: number,
    title: string,
    price: number,
    quantity: number,
    imageUrl: string,
    imageTitle: string,
    imageSize: string
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
    this.imageTitle = imageTitle;
    this.imageSize = imageSize;
  }
}
