const products = [
  {
    id: "p1",
    title: "Apple AirPods 4 Wireless Earbuds",
    price: 129.99,
    rating: 5,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61DvMw16ITL._AC_SX466_.jpg",
    description:
      "Personalized spatial audio, sweat resistance, and all-day battery life.",
    onSale: true,
  },
  {
    id: "p2",
    title: "Sony WH-1000XM5 Noise Cancelling Headphones",
    price: 299.99,
    rating: 4,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SY450_.jpg",
    description:
      "Premium wireless sound with exceptional active noise cancellation.",
    onSale: false,
  },
  {
    id: "p3",
    title: "SUS ROG Strix G16 (2025) Gaming Laptop",
    price: 1599,
    rating: 4,
    category: "Electronics",
    image:
      "https://m.media-amazon.com/images/I/81n1T4CYfmL._AC_UL480_FMwebp_QL65_.jpg",
    description:
      "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” FHD+ 16:10 165Hz/3ms Display, NVIDIA® GeForce RTX™ 5060 Laptop GPU, Intel® Core™ i7 Processor 14650HX, 16GB DDR5, 1TB Gen 4 SSD, Wi-Fi 7, Windows 11 Home",
    onSale: true,
  },
  {
    id: "p4",
    title: "Slow Cooker with Ceramic",
    price: 59.99,
    rating: 4,
    category: "Home",
    image: "https://m.media-amazon.com/images/I/71qFPlBArfL._AC_SY450_.jpg",
    description:
      "Amazon Basics Triple Slow Cooker with Ceramic Non-Stick Coating and Temperature Controls, 3 x 2.5 Quarts, Stainless Steel.",
    onSale: false,
  },
  {
    id: "p5",
    title: "CUSHIONAIRE Pool Slides",
    price: 12.99,
    rating: 4,
    category: "Fashion",
    image: "https://m.media-amazon.com/images/I/71NStLIJ8SL._AC_SY500_.jpg",
    description:
      "CUSHIONAIRE Pool Slides for Women Waterproof Double Buckle Adjustable Slip-On Womens Sandals for Beach Shower Casual Wear",
    onSale: false,
  },
  {
    id: "p6",
    title: "Flexi Hose 50ft Expandable Garden Hose",
    price: 18.5,
    rating: 4,
    category: "Home",
    image:
      "https://m.media-amazon.com/images/I/71VrKX9qj2L._AC_SY300_SX300_QL70_FMwebp_.jpg",
    description:
      "Flexi Hose Expandable Garden Hose with 8 Function Nozzle, 50FT - Lightweight Retractable Garden Hose, Water Hose - No-Kink Flexibility, 3/4 Inch Solid Brass Fittings and Double Latex Core.",
    onSale: true,
  },
  {
    id: "p7",
    title: "EGOHOME Full Size Memory Foam Mattress",
    price: 19.99,
    rating: 5,
    category: "Home",
    image: "https://m.media-amazon.com/images/I/81jKMf1QpyL._AC_SY450_.jpg",
    description:
      "EGOHOME Full Size Memory Foam Mattress, 8 Inch Bed Mattress in A Box with Cooling Green Tea Gel, Pressure Relief with Medium Firm Support, CertiPUR-US Certified, 75''L x 54''W, 37.3 pounds White.",
    onSale: false,
  },
  {
    id: "p8",
    title: "The Many Lives of Tupac Shakur",
    price: 24.99,
    rating: 4,
    category: "Books",
    image: "https://m.media-amazon.com/images/I/81SuvNzSJqL._SX342_.jpg",
    description: "Only God Can Judge Me: The Many Lives of Tupac Shakur.",
    onSale: false,
  },
  {
    id: "p9",
    title: "Apple iPad Pro",
    price: 599.99,
    rating: 4,
    category: "Electronics",
    image:
      "https://m.media-amazon.com/images/I/518-OdywM-L._AC_SX466_.jpg",
    description:
      "Apple iPad Pro 2024 (11-inch, Wi-Fi + Cellular, 256GB) - Space Black.",
    onSale: false,
  },
  {
    id: "p10",
    title: "Neoprene Dumbbell Hand Weights",
    price: 24.95,
    rating: 5,
    category: "Sports",
    image: "https://m.media-amazon.com/images/I/81yjPYQIBcL._AC_SX300_SY300_QL70_FMwebp_.jpg",
    description:
      "Amazon Basics Neoprene Dumbbell Hand Weights for Exercise and Muscle Toning.",
    onSale: true,
  },
  {
    id: "p11",
    title: "WHOOP 5.0/MG Activity Tracker",
    price: 22.99,
    rating: 5,
    category: "Sports",
    image:
      "https://m.media-amazon.com/images/I/71-Bc3KaY3L._AC_SY300_SX300_QL70_FMwebp_.jpg",
    description:
      "12 Month Membership - Health and Fitness Wearable – 24/7 Activity and Sleep Tracker, Personalized Coaching, Menstrual Cycle Insights – 14+ Days Battery Life.",
    onSale: false,
  },
  {
    id: "p12",
    title: "SimpliSafe 9 Piece Wireless Home Security System w/HD Camera",
    price: 14.5,
    rating: 3,
    category: "Home",
    image:
      "https://m.media-amazon.com/images/I/610wItBt81L._AC_SY300_SX300_QL70_FMwebp_.jpg",
    description:
      "Optional 24/7 Professional Monitoring - No Contract - Compatible with Alexa and Google Assistant.",
    onSale: false,
  },
  {
    id: "p13",
    title: "Smart Oil Gauge",
    price: 109.99,
    rating: 3,
    category: "Home",
    image: "https://m.media-amazon.com/images/I/710r+hkSShL._AC_SX425_.jpg",
    description:
      "Wi-Fi Heating Oil Tank Gauge with Smart Monitoring - Fuel Tank Gauge Compatible with Alexa - Designed for 275/330/500/550 Gallon Tanks (Vertical/Horizontal).",
    onSale: false,
  },
  {
    id: "p14",
    title: "Cosori 9-in-1 TurboBlaze Air Fryer 6",
    price: 21.5,
    rating: 3,
    category: "Home",
    image:
      "https://m.media-amazon.com/images/I/81lTKYX5LNL._AC_SY450_.jpg",
    description:
      "Air Fryer 6 Qt, PFAS-Free Ceramic Coating, 90°–450°F, Precise Heating for Even Results, Air Fry, Roast, Bake, Broil, Dry, Frozen, Proof, Reheat, Keep Warm, 120V, Dark Gray.",
    onSale: false,
  },
  {
    id: "p15",
    title: "Miracase Magnetic for iPhone 17 Case",
    price: 9.99,
    rating: 3,
    category: "Electronics",
    image:
      "https://m.media-amazon.com/images/I/61bJDZkosXL._AC_SX425_.jpg",
    description:
      "Compatible with MagSafe, Integrated Silicone Camera Control Cover, 3.0mm Thicken Shockproof Drop Protection Phone Case for 17, Black.",
    onSale: false,
  },
];
