export interface Shipment {
  id: string
  productName: string
  productImage: string
  marketplace: "express" | "supermall" | "market" | "global"
  deliveredOn: string
  returnLabel: string
  returnable: boolean
  rating: 0 | 1 | 2 | 3 | 4 | 5
}

export const SHIPMENTS: Shipment[] = [
  {
    id: "ship-1",
    productName:
      "Samsung 8KG Washer With 6KG Dryer, Eco Bubble, Air Wash, Hygiene Steam With Digital Inverter Technology 1400 RPM 8.0 kg",
    productImage: "/reviews-flow/products/sample-product.png",
    marketplace: "express",
    deliveredOn: "April 16, 2026",
    returnLabel: "Returnable till Apr 24",
    returnable: true,
    rating: 0,
  },
  {
    id: "ship-2",
    productName:
      "Samsung 8KG Washer With 6KG Dryer, Eco Bubble, Air Wash, Hygiene Steam With Digital Inverter Technology 1400 RPM 8.0 kg",
    productImage: "/reviews-flow/products/sample-product.png",
    marketplace: "express",
    deliveredOn: "April 16, 2026",
    returnLabel: "Return window closed Apr 12",
    returnable: false,
    rating: 0,
  },
  {
    id: "ship-3",
    productName: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones, 30hr Battery, Bluetooth 5.2, Touch Sensor Controls",
    productImage: "/reviews-flow/products/sample-product.png",
    marketplace: "supermall",
    deliveredOn: "April 9, 2026",
    returnLabel: "Returnable till Apr 17",
    returnable: true,
    rating: 0,
  },
  {
    id: "ship-4",
    productName: "Apple AirPods Pro (2nd Generation) with MagSafe Charging Case (USB-C), Active Noise Cancellation",
    productImage: "/reviews-flow/products/sample-product.png",
    marketplace: "global",
    deliveredOn: "March 28, 2026",
    returnLabel: "Return window closed Apr 4",
    returnable: false,
    rating: 0,
  },
  {
    id: "ship-5",
    productName: "Bose QuietComfort Ultra Headphones with Spatial Audio, Wireless, Over-Ear, Up to 24 Hours Battery",
    productImage: "/reviews-flow/products/sample-product.png",
    marketplace: "market",
    deliveredOn: "March 20, 2026",
    returnLabel: "Return window closed Mar 28",
    returnable: false,
    rating: 0,
  },
  {
    id: "ship-6",
    productName: "JBL Tune 770NC Wireless Over-Ear Adaptive Noise Cancelling Headphones, 70hr Battery, Pure Bass Sound",
    productImage: "/reviews-flow/products/sample-product.png",
    marketplace: "express",
    deliveredOn: "March 12, 2026",
    returnLabel: "Return window closed Mar 20",
    returnable: false,
    rating: 0,
  },
]
