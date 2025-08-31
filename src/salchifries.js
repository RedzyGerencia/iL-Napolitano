import { iLNapolitanoProductos } from "./iLNapolitanoProductos.js";
import { selector_cantidades } from "./components.js";

const SCREEN_RESPONSES = {
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
    },
  },

  BEBIDAS: {
    screen: "BEBIDAS",
    data: {},
  },

  CANT_BEBIDAS: {
    screen: "CANT_BEBIDAS",
    data: {},
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

export const getNextScreen = async (decryptedBody) => {
  const { screen, data, version, action, flow_token } = decryptedBody;

  // handle health check request
  if (action === "ping") {
    return {
      data: {
        status: "active",
      },
    };
  }

  // handle error notification
  if (data?.error) {
    console.warn("Received client error:", data);
    return {
      data: {
        acknowledged: true,
      },
    };
  }

  // handle initial request when opening the flow and display LOAN screen
  if (action === "INIT") {
    return {
      ...SCREEN_RESPONSES.INICIO,
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      case "INICIO":
        const arrayTipoPapas = data?.tipo_papas ?? [];
        const papasArmadas = arrayTipoPapas.includes("Papas armadas");
        const papasClasicas = arrayTipoPapas.includes("Papas clasicas");

        if (papasArmadas) {
          return {
            ...SCREEN_RESPONSES.ARMADAS,
            data: {
              ...SCREEN_RESPONSES.ARMADAS.data,
              chk_papas_clasicas: papasClasicas,
            },
          };
        } else {
          return {
            ...SCREEN_RESPONSES.CLASICAS,
          };
        }

      case "ARMADAS":
        const papaClasica = data?.["chk_papas_clasicas"] ?? false;

        if (papaClasica) {
          return {
            ...SCREEN_RESPONSES.CLASICAS,
            data: {
              ...SCREEN_RESPONSES.CLASICAS.data,
              ...data,
            },
          };
        } else {
          return {
            ...SCREEN_RESPONSES.BEBIDAS,
            data: {
              ...SCREEN_RESPONSES.BEBIDAS.data,
              ...data,
            },
          };
        }

      case "CLASICAS":
        return {
          ...SCREEN_RESPONSES.CANT_CLASICAS,
          data: {
            ...SCREEN_RESPONSES.CANT_CLASICAS.data,
            ...data,
          },
        };

      case "CANT_CLASICAS":
        return {
          ...SCREEN_RESPONSES.ADC_CLASICAS,
          data: {
            ...SCREEN_RESPONSES.ADC_CLASICAS.data,
            ...data,
          },
        };

      case "ADC_CLASICAS":
        let chkAdicionales = false;

        for (const key in data) {
          if (key.startsWith("adc_") && data[key] === true) {
            chkAdicionales = true;
            break;
          }
        }

        if (chkAdicionales) {
          return {
            ...SCREEN_RESPONSES.CANT_ADC,
            data: {
              ...SCREEN_RESPONSES.CANT_ADC.data,
              ...data,
            },
          };
        } else {
          return {
            ...SCREEN_RESPONSES.BEBIDAS,
            data: {
              ...SCREEN_RESPONSES.BEBIDAS.data,
              ...data,
            },
          };
        }

      case "BEBIDAS":
        return {
          ...SCREEN_RESPONSES.RESUMEN_PEDIDO,
        };

      case "RESUMEN_PEDIDO":
        return {
          ...SCREEN_RESPONSES.FORMULARIO,
        };

      default:
        break;
    }
  }

  console.error("Unhandled request body:", decryptedBody);
  throw new Error(
    "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
  );
};
