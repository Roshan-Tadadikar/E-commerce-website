import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    name: "Nike Blazer Low '77 Vintage",
    price: "7495",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/t_default/f139155d-5114-4539-892d-87de7d5ac40d/blazer-low-77-vintage-shoes-HmmkdX.png"
    ,star:"4",
    sizes:[9,10,12]
  },
  {
    _id: uuid(),
    name: "Nike Dunk High Retro",
    price: "7207",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/t_default/8e5c2b2d-ffed-4874-a843-338faf37b8e3/dunk-high-retro-shoes-Cg1ncq.png"
    ,star:"5"
    ,sizes:[8,9,10]
  },
  {
    _id: uuid(),
    name: "Nike Dunk High Retro Premium",
    price: "11495",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/t_default/f6eb0c8c-78a5-4467-928e-46457c70a4d3/dunk-high-retro-shoes-c4lpG4.png"
    ,star:"5"
    ,sizes:[9,10,11]
  },
  {
    _id: uuid(),
    name: "Air Jordan 1 Retro High OG",
    price: "16995",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/t_default/03ac93ba-0ab0-4e37-a623-9972de262234/air-jordan-1-retro-high-og-shoes-Pz6fZ9.png"
    ,star:"5"
    ,sizes:[4,5,6]
  },
  {
    _id: uuid(),
    name: "Air Jordan 1 Next Chapter",
    price: "18395",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/4e46bd9c-791f-4a81-8899-c6860bb8de08/air-jordan-1-next-chapter-dv1748-601-release-date.jpg"
    ,star:"5"
    ,sizes:[7,8,9]
  },
  {
    _id: uuid(),
    name: "Air Max Scorpion Black and University Red",
    price: "22995",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/665bd666-40dc-4e3b-897a-1a37cfca41d1/air-max-scorpion-black-and-university-red-dj4701-004-release-date.jpg"
    ,star:"5"
    ,sizes:[6,7,8]
  },
  {
    _id: uuid(),
    name: "Air Jordan Low SE",
    price: "10295",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a576a457-055e-40ff-911d-f148529e97e2/air-jordan-low-se-shoes-KKFsH5.png"
    ,star:"5"
    ,sizes:[9,11,12]
  },
  {
    _id: uuid(),
    name: "Air Max 97",
    price: "16995",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/91397f06-dc7f-49a4-90f3-0abf0a3c2884/air-max-97-shoes-EBZrb8.png  "
    ,star:"5"
    ,sizes:[5,6,7]
  },
  {
    _id: uuid(),
    name: "Nike SB Chron 2",
    price: "4995",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ca2b356e-8aa3-4355-9e6f-d76a70c9dcf0/sb-chron-2-canvas-skate-shoe-zdBtfH.png"
    ,star:"3"
    ,sizes:[8,9,10]
  },
   {
    _id: uuid(),
    name: "Nike Air Force 1 Low x UNDEFEATED",
    price: "13995",
    categoryName: "Nike",
    img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ca2b356e-8aa3-4355-9e6f-d76a70c9dcf0/sb-chron-2-canvas-skate-shoe-zdBtfH.png"
    ,star:"5"
    ,sizes:[9,4,12]
  },












  {
    _id: uuid(),
    name: "BMW M Motorsport RDG Cat 2.0 Unisex Sneakers",
    price: "8999",
    categoryName: "Puma",
    img:"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_500,h_500/global/307492/02/sv01/fnd/IND/fmt/png/BMW-M-Motorsport-RDG-Cat-2.0-Unisex-Sneakers"
    ,star:"4"
    ,sizes:[4,5,3]  
  },

  {
    _id: uuid(),
    name: "Scuderia Ferrari Nitro Sneakers",
    price: "34999",
    categoryName: "Puma",
    img:"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/307508/01/sv01/fnd/IND/fmt/png/Scuderia-Ferrari-Ultimate-Nitro-Unisex-Sneakers"
    ,star:"5"
    ,sizes:[7,10,12]
  },
  {
    _id: uuid(),
    name: "BMW M Motorsport RDGSneakers",
    price: "8999",
    categoryName: "Puma",
    img:"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_500,h_500/global/307492/02/sv01/fnd/IND/fmt/png/BMW-M-Motorsport-RDG-Cat-2.0-Unisex-Sneakers"
    ,star:"4"
    ,sizes:[5,6,7,8]
  },
  {
    _id: uuid(),
    name: "Scuderia Ferrari  Driving Shoes",
    price: "11999",
    categoryName: "Puma",
    img:"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/307545/02/sv01/fnd/IND/fmt/png/Scuderia-Ferrari-Carbon-Cat-Mid-Unisex-Driving-Shoes"
    ,star:"4"
    ,sizes:[9,10,11]
  },
  {
    _id: uuid(),
    name: "Caracal Unisex Sneakers",
    price: "2249",
    categoryName: "Puma",
    img:"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_500,h_500/global/369863/24/sv01/fnd/IND/fmt/png/Caracal-Unisex-Sneakers"
    ,star:"3"
    ,sizes:[9,10,12]
  },
  {
    _id: uuid(),
    name: "PUMA SHUFFLE x1DER ",
    price: "2669",
    categoryName: "Puma",
    img:"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_350,h_350/global/392913/03/sv01/fnd/IND/fmt/png/PUMA-SHUFFLE-x1DER-Men's-Sneakers"
    ,star:"2"
    ,sizes:[9,10,11,12]
  },

  
  {
    _id: uuid(),
    name: "ROVEREND ADVENTURE SHOES",
    price: "20000",
    categoryName: "Adidas",
    img:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/015372f724a642cfb6a3aeee0159a592_9366/roverend-adventure-shoes.jpg"
    ,star:"5"
    ,sizes:[12]
  },
  {
    _id: uuid(),
    name: "GRAND COURT SHOES",
    price: "1720",
    categoryName: "Adidas",
    img:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/519701fc1a9442e2bc01aaf501201627_9366/grand-court-shoes.jpg"
    ,star:"2"
    ,sizes:[9,10,11,12]
  },
  {
    _id: uuid(),
    name: "NMD_R1 SHOES",
    price: "13000",
    categoryName: "Adidas",
    img:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/c7823dd587e44bffaadaaed701488bbf_9366/nmd_r1-shoes.jpg"
    ,star:"5"
    ,sizes:[11]
  },
  {
    _id: uuid(),
    name: "Nora Shoes",
    price: "2249",
    categoryName: "Adidas",
    img:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/8b4f8515f62a412f8decaf35010754f7_9366/nora-shoes.jpg"
    ,star:"2"
    ,sizes:[9,10,11,12]
  },
  {
    _id: uuid(),
    name: "Coreracer Shoes",
    price: "5549",
    categoryName: "Adidas",
    img:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/753be56304c54f21badcabab002e456c_9366/coreracer-shoes.jpg"
    ,star:"3"
    ,sizes:[9,10,11,12]
  },

  
  
  
  
  {
    _id: uuid(),
    name: "Run Star Legacy ",
    price: "9999",
    categoryName: "Converse",
    img:"https://www.converse.in/media/catalog/product/a/0/a06027c_a_107x1.jpg?optimize=medium&bg-color=255%2C255%2C255&fit=cover&height=1200&width=960&auto=webp&format=pjpg"
    ,star:"4"
    ,sizes:[8,10,9]
  },
  {
    _id: uuid(),
    name: "Chuck 70",
    price: "6000",
    categoryName: "Converse",
    img:"https://www.converse.in/media/catalog/product/a/0/a03085c_01.jpg?optimize=medium&bg-color=255%2C255%2C255&fit=cover&height=1200&width=960&auto=webp&format=pjpg"
    ,star:"4"
    ,sizes:[9,10,11,12]
  },
  {
    _id: uuid(),
    name: "Weapon CX ",
    price: "6999",
    categoryName: "Converse",
    img:"https://www.converse.in/media/catalog/product/a/0/a03230c_01_1.jpg?optimize=medium&bg-color=255%2C255%2C255&fit=cover&height=1200&width=960&auto=webp&format=pjpg"
    ,star:"3"
    ,sizes:[9,10,11,12]
  },
  {
    _id: uuid(),
    name: "Chuck Taylor All Star",
    price: "5549",
    categoryName: "Converse",
    img:"https://www.converse.in/media/catalog/product/m/9/m9622c_01_1_1.jpg?optimize=medium&bg-color=255%2C255%2C255&fit=cover&height=1200&width=960&auto=webp&format=pjpg"
    ,star:"5"
    ,sizes:[9,10,11,4]
  },
  {
    _id: uuid(),
    name: "Chuck 70 canvas",
    price: "5549",
    categoryName: "Converse",
    img:"https://www.converse.in/media/catalog/product/1/6/162065c_01.jpg?optimize=medium&bg-color=255%2C255%2C255&fit=cover&height=1200&width=960&auto=webp&format=pjpg"
    ,star:"4"
    ,sizes:[9,10,11,3]
  },
];
