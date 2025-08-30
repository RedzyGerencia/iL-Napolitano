import { iLNapolitanoProductos } from "./iLNapolitanoProductos.js";
import { selector_cantidades } from "./components.js";

const SCREEN_RESPONSES = {
  INICIO: {
    screen: "INICIO",
    data: {},
  },

  CLASICAS: {
    screen: "CLASICAS",
    data: {},
  },

  CANT_CLASICAS: {
    screen: "CANT_CLASICAS",
    data: {},
  },

  ADC_CLASICAS: {
    screen: "ADC_CLASICAS",
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
        const arrayTipoPapas = new Array(data.tipo_papas);
        const papasArmadas = arrayTipoPapas.includes("Papas armadas");

        if (papasArmadas) {
          return {
            ...SCREEN_RESPONSES.ARMADAS,
          };
        } else {
          return {
            ...SCREEN_RESPONSES.CLASICAS,
          };
        }

      case "ARMADAS":
        return {
          ...SCREEN_RESPONSES.CLASICAS,
        };

      case "CLASICAS":
        return {
          ...SCREEN_RESPONSES.CANT_CLASICAS,
        };

      case "CANT_CLASICAS":
        return {
          ...SCREEN_RESPONSES.ADC_CLASICAS,
        };

      case "ADC_CLASICAS":
        return {
          ...SCREEN_RESPONSES.BEBIDAS,
        };

      case "BEBIDAS":
        return {
          ...SCREEN_RESPONSES.RESUMEN_PEDIDO,
          data: {
            ...SCREEN_RESPONSES.RESUMEN_PEDIDO.data,
            mensaje: texto,
            valorTotal: totalPedido,
            valorTotalStr: totalString,
            obs_productos: obs_productos,
          },
        };

      case "RESUMEN_PEDIDO":
        return {
          ...SCREEN_RESPONSES.FORMULARIO,
          data: {
            ...SCREEN_RESPONSES.FORMULARIO.data,
            ...data,
          },
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
