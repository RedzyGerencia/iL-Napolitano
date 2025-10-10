import { selector_cantidades } from "./components.js";

export const SCREEN_RESPONSES = {
  Inicio: {
    screen: "Inicio",
    data: {
      PizzasTradicionales: false,
      PizzasEspeciales: false,
      PizzasBordeQueso: false,
      Pastas: false,
      Lasagna: false,
      Maicitos: false,
      Canelones: false,
      Calzone: false,
      Sandwich: false,
    },
  },

  Productos: {
    screen: "Productos",
    data: {
      PizzasTradicionales: false,
      PizzasEspeciales: false,
      PizzasBordeQueso: false,
      Pastas: false,
      hamburguesas: false,
      Lasagna: false,
      Maicitos: false,
      Canelones: false,
      Calzone: false,
      Sandwich: false,

      chk_pas_1: false,
      chk_pas_2: false,
      chk_pas_3: false,
      chk_las_1: false,
      chk_las_2: false,
      chk_las_3: false,
      chk_las_4: false,
      chk_las_5: false,
      chk_las_6: false,
      chk_mac_1: false,
      chk_mac_2: false,
      chk_mac_3: false,
      chk_mac_4: false,
      chk_can_1: false,
      chk_can_2: false,
      chk_can_3: false,
      chk_cal_1: false,
      chk_san_1: false,
      chk_pizza_1: false,
      chk_pizza_2: false,
      chk_pizza_3: false,
      chk_pizza_4: false,
      chk_pizza_5: false,
      chk_pizza_esp_1: false,
      chk_pizza_esp_2: false,
      chk_pizza_esp_3: false,
      chk_pizza_esp_4: false,
      chk_pizza_esp_5: false,

      sabores_pizza: [
        {
          id: "1",
          title: "Peperoni",
          description: "Salsa napolitana, queso y peperoni.",
        },
        {
          id: "2",
          title: "Peperoni y Champiñones",
          description: "Salsa napolitana, queso, peperoni y champiñones.",
        },
        {
          id: "3",
          title: "Hawaiana",
          description: "Salsa de piña, queso, jamón y piña.",
        },
        {
          id: "4",
          title: "Queso",
          description: "Salsa napolitana y queso.",
        },
        {
          id: "5",
          title: "Vegetales",
          description:
            "Salsa napolitana, queso, champiñon, cebolla, pimentón y tomate.",
        },
        {
          id: "6",
          title: "Napolitana",
          description: "Salsa napolitana, queso, rodajas de tomate y albaca.",
        },
        {
          id: "7",
          title: "Pollo",
          description: "Salsa napolitana, queso y pollo.",
        },
        {
          id: "8",
          title: "Pollo y Champiñones",
          description: "Salsa napolitana, queso, pollo y champiñones.",
        },
        {
          id: "9",
          title: "Pollo y BBQ",
          description: "Salsa napolitana, queso, pollo y BBQ.",
        },
        {
          id: "10",
          title: "Carne con Tocineta",
          description:
            "Salsa napolitana, queso, tocineta, chorizo, jamón, salchicha.",
        },
        {
          id: "11",
          title: "Tocineta y Maíz",
          description: "Salsa napolitana, queso, tocineta y maíz.",
        },
        {
          id: "12",
          title: "Jamón",
          description: "Salsa napolitana, queso y jamón.",
        },
        {
          id: "13",
          title: "Tocineta",
          description: "Salsa napolitana, queso y tocineta.",
        },
        {
          id: "14",
          title: "Carnes",
          description: "Salsa napolitana, queso, salami, jamón y cabano.",
        },
        {
          id: "15",
          title: "Pizza Ranchera",
          description:
            "Salsa napolitana, queso, chorizo, jamón, tocineta, maíz.",
        },
        {
          id: "16",
          title: "Pizza de la Casa",
          description:
            "Salsa napolitana, queso, champiñon, jamón, tocineta, maíz.",
        },
        {
          id: "17",
          title: "Pizza Colombiana",
          description: "Salsa napolitana, queso, chorizo, maíz y aguacate.",
        },
        {
          id: "18",
          title: "Pizza Mixta",
          description:
            "Salsa napolitana, queso, salami, jamón, cabano, cebolla, pimentón y tomate.",
        },
      ],

      porciones_pizza: [
        {
          id: "Mini",
          title: "MINI / 4 Porciones",
          description: "Tamaño: 18cm",
          metadata: "$14.500",
        },
        {
          id: "Personal",
          title: "PERSONAL / 6 Porciones",
          description: "Tamaño: 24cm",
          metadata: "$27.000",
        },
        {
          id: "Mediana",
          title: "MEDIANA / 8 Porciones",
          description: "Tamaño: 30cm",
          metadata: "$38.500",
        },
        {
          id: "Grande",
          title: "GRANDE / 10 Porciones",
          description: "Tamaño: 35cm",
          metadata: "$46.500",
        },
        {
          id: "Extra Grande",
          title: "EXTRA GRANDE / 12 Porciones",
          description: "Tamaño: 40cm",
          metadata: "$60.500",
        },
        {
          id: "Jumbo",
          title: "JUMBO / 16 Porciones",
          description: "Tamaño: 50cm",
          metadata: "$78.000",
        },
      ],

      sabores_especiales: [
        {
          id: "1",
          title: "Hawaiana con Tocineta",
          description: "Salsa de piña, queso, piña, jamón y tocienta.",
        },
        {
          id: "2",
          title: "Pollo Tocineta",
          description: "Salsa napolitana, queso, pollo y tocineta.",
        },
        {
          id: "3",
          title: "Desmechada y Tocineta",
          description: "Salsa napolitana, queso, carne desmechada y tocineta.",
        },
        {
          id: "4",
          title: "Desmechada y Champiñones",
          description:
            "Salsa napolitana, queso mozarela, queso azul y queso parmesano.",
        },
        {
          id: "5",
          title: "Tres Quesos",
          description:
            "Salsa napolitana, queso mozarela, queso azul y queso parmesano.",
        },
        {
          id: "6",
          title: "Mexicana",
          description:
            "Salsa napolitana, queso, carne desmechada, jalapeño, maíz y aguacate.",
        },
        {
          id: "7",
          title: "Pizza Pacho",
          description:
            "Salsa napolitana, queso, pollo, carne desmechada y tocineta.",
        },
        {
          id: "8",
          title: "Peperoni y Tocineta",
          description: "Salsa Napolitana, queso, peperoni y tocineta.",
        },
        {
          id: "9",
          title: "Árabe",
          description:
            "Salsa napolitana, queso, pepinillos, tomate y aceitunas.",
        },
      ],

      porciones_especiales: [
        {
          id: "Mini",
          title: "MINI / 4 Porciones",
          description: "Tamaño: 18cm",
          metadata: "$17.000",
        },
        {
          id: "Personal",
          title: "PERSONAL / 6 Porciones",
          description: "Tamaño: 24cm",
          metadata: "$32.500",
        },
        {
          id: "Mediana",
          title: "MEDIANA / 8 Porciones",
          description: "Tamaño: 30cm",
          metadata: "$45.500",
        },
        {
          id: "Grande",
          title: "GRANDE / 10 Porciones",
          description: "Tamaño: 35cm",
          metadata: "$54.500",
        },
        {
          id: "Extra Grande",
          title: "EXTRA GRANDE / 12 Porciones",
          description: "Tamaño: 40cm",
          metadata: "$65.500",
        },
        {
          id: "Jumbo",
          title: "JUMBO / 16 Porciones",
          description: "Tamaño: 50cm",
          metadata: "$90.000",
        },
      ],

      sabores_bordequeso: [
        {
          id: "1",
          title: "Hawaiana con Tocineta",
          description: "Salsa de piña, queso, piña, jamón y tocienta.",
        },
      ],

      porciones_bordequeso: [
        {
          id: "Mini",
          title: "MINI / 4 Porciones",
          description: "Tamaño: 18cm",
          metadata: "$18.500",
        },
        {
          id: "Personal",
          title: "PERSONAL / 6 Porciones",
          description: "Tamaño: 24cm",
          metadata: "$35.000",
        },
        {
          id: "Mediana",
          title: "MEDIANA / 8 Porciones",
          description: "Tamaño: 30cm",
          metadata: "$49.000",
        },
        {
          id: "Grande",
          title: "GRANDE / 10 Porciones",
          description: "Tamaño: 35cm",
          metadata: "$58.000",
        },
        {
          id: "Extra Grande",
          title: "EXTRA GRANDE / 12 Porciones",
          description: "Tamaño: 40cm",
          metadata: "$70.500",
        },
        {
          id: "Jumbo",
          title: "JUMBO / 16 Porciones",
          description: "Tamaño: 50cm",
          metadata: "$96.000",
        },
      ],
    },
  },

  Cantidades: {
    screen: "Cantidades",
    data: {
      chk_pas_1: false,
      chk_pas_2: false,
      chk_pas_3: false,
      chk_las_1: false,
      chk_las_2: false,
      chk_las_3: false,
      chk_las_4: false,
      chk_las_5: false,
      chk_las_6: false,
      chk_mac_1: false,
      chk_mac_2: false,
      chk_mac_3: false,
      chk_mac_4: false,
      chk_can_1: false,
      chk_can_2: false,
      chk_can_3: false,
      chk_cal_1: false,
      chk_san_1: false,
      selector_cantidades,
    },
  },

  Bebidas: {
    screen: "Bebidas",
    data: {
      chk_beb_1: false,
      chk_beb_2: false,
      chk_beb_3: false,
      chk_beb_4: false,
      chk_beb_5: false,
      chk_beb_6: false,
      chk_beb_7: false,
      chk_beb_8: false,
      chk_beb_9: false,
      chk_beb_10: false,
      selector_cantidades,
    },
  },

  Resumen: {
    screen: "Resumen",
    data: {},
  },

  Formulario: {
    screen: "Formulario",
    data: {},
  },

  SUCCESS: {
    screen: "SUCCESS",
    data: {
      extension_message_response: {
        params: {
          flow_token: "REPLACE_FLOW_TOKEN",
          some_param_name: "PASS_CUSTOM_VALUE",
        },
      },
    },
  },
};
