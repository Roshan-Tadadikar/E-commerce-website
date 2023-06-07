import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Nike",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.",
      img:"https://images.unsplash.com/photo-1509983165097-0c31a863e3f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80https://w7.pngwing.com/pngs/780/395/png-transparent-orange-nike-logo-nike-free-logo-brand-illustration-creative-nike-painted-text-hand.png"
  },
  {
    _id: uuid(),
    categoryName: "Puma",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.",
      img:"https://cdn.about.puma.com/-/media/images/newsroom/pictures-and-footage/m-s-8-headquarter2.jpg?as=1&h=263&iar=1&w=350&rev=f0131a73296646cca62540f771e15e74&hash=45620993C4B56EDBCB4A6ABE1B9E524A"
  },
  {
    _id: uuid(),
    categoryName: "Adidas",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    img:"https://i2-prod.football.london/arsenal-fc/news/article26341679.ece/ALTERNATES/s615/0_Adidas.jpg"
  },
  {
    _id: uuid(),
    categoryName: "Converse",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    img:"https://www.converse.com/on/demandware.static/-/Library-Sites-ConverseEU01SharedLibrary/default/dw9f72ba77/firstspirit/converse-uk/media/store_locator___details/gbl_store_locator/factory_default/Generic_Factory_hero_mobile_v2.jpg"
  },

];
