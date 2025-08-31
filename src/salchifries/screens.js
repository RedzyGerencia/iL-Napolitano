import { selector_cantidades } from "./components.js";

export const SCREEN_RESPONSES = {
  INICIO: {
    screen: "INICIO",
    data: {},
  },

  ARMADAS: {
    screen: "ARMADAS",
    data: {
      chk_papa_1: false,
      chk_papa_2: false,
      chk_papa_3: false,
      chk_papa_4: false,
      chk_papa_5: false,
      base_francesa: true,
      base_criolla: true,
      base_francesa_2: true,
      base_criolla_2: true,
      base_francesa_3: true,
      base_criolla_3: true,
      base_francesa_4: true,
      base_criolla_4: true,
      base_francesa_5: true,
      base_criolla_5: true,
    },
  },

  CLASICAS: {
    screen: "CLASICAS",
    data: {
      base_salchimorrongo_1: false,
      base_salchimorrongo_2: false,
      base_salchipork_1: false,
      base_salchipork_2: false,
      base_salchicharron_1: false,
      base_salchicharron_2: false,
      base_costifries_1: false,
      base_costifries_2: false,
      base_salchibumanguesas_1: false,
      base_salchibumanguesas_2: false,
      base_salchicriolla_1: false,
      base_salchicriolla_2: false,
      base_salchimex_1: false,
      base_salchimex_2: false,
      base_salchichori_1: false,
      base_salchichori_2: false,
    },
  },

  CANT_CLASICAS: {
    screen: "CANT_CLASICAS",
    data: {
      selector_cantidades,
    },
  },

  ADC_CLASICAS: {
    screen: "ADC_CLASICAS",
    data: {},
  },

  CANT_ADC: {
    screen: "CANT_ADC",
    data: {
      adc_salchicha: false,
      adc_chorizo: false,
      adc_tocineta: false,
      adc_morrongo: false,
      adc_carne_trozos: false,
      adc_pollo_desmechado: false,
      adc_pechuga_trozos: false,
      adc_carne_desmechada: false,
      adc_costillas: false,
      adc_pulled_pork: false,
      adc_chicharrones: false,
      adc_queso_gratinado: false,
      adc_maduritos: false,
      adc_maiz_dulce: false,
      adc_guacamole: false,
      adc_papa_fosforo: false,
      adc_bano_queso: false,
      selector_cantidades,
    },
  },

  BEBIDAS: {
    screen: "BEBIDAS",
    data: {},
  },

  CANT_BEBIDAS: {
    screen: "CANT_BEBIDAS",
    data: {
      chk_bebida_1: false,
      chk_bebida_2: false,
      chk_bebida_3: false,
      chk_bebida_4: false,
      chk_bebida_5: false,
      chk_bebida_6: false,
      chk_bebida_7: false,
      chk_bebida_8: false,
      chk_bebida_9: false,
      chk_bebida_10: false,
      selector_cantidades,
    },
  },

  RESUMEN_PEDIDO: {
    screen: "RESUMEN_PEDIDO",
    data: {},
  },

  FORMULARIO: {
    screen: "FORMULARIO",
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
