import { iLNapolitanoProductos } from "./iLNapolitanoProductos.js";

const SCREEN_RESPONSES = {
  ENTRADAS: {
    screen: "ENTRADAS",
    data: {},
  },

  SUGERENCIAS: {
    screen: "SUGERENCIAS",
    data: {},
  },

  CANTIDADES: {
    screen: "CANTIDADES",
    data: {},
  },

  ENSALADAS_POSTRES: {
    screen: "ENSALADAS_POSTRES",
    data: {},
  },

  BEBIDAS: {
    screen: "BEBIDAS",
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

const SPLIT_PRODUCTS_AND_NOTES = (dataObj = {}) => {
  const SELECTED_PRODUCTS = [];
  const OBS_PRODUCTS = [];

  for (const [key, value] of Object.entries(dataObj)) {
    if (key.startsWith("can_")) {
      Array.isArray(value)
        ? SELECTED_PRODUCTS.push(...value)
        : SELECTED_PRODUCTS.push(value);
    } else if (key.startsWith("obs_")) {
      Array.isArray(value)
        ? OBS_PRODUCTS.push(...value)
        : OBS_PRODUCTS.push(value);
    }
  }
  return { SELECTED_PRODUCTS, OBS_PRODUCTS };
};

const SPLIT_ADDITIONAL_AND_NOTES = (dataObj = {}) => {
  const SELECTED_ADDITIONAL = [];
  const OBS_ADDITIONAL = [];

  for (const [key, value] of Object.entries(dataObj)) {
    if (key.startsWith("can_ad")) {
      Array.isArray(value)
        ? SELECTED_ADDITIONAL.push(...value)
        : SELECTED_ADDITIONAL.push(value);
    } else if (key.startsWith("obs_ENSALADAS_POSTRES")) {
      Array.isArray(value)
        ? OBS_ADDITIONAL.push(...value)
        : OBS_ADDITIONAL.push(value);
    }
  }
  return { SELECTED_ADDITIONAL, OBS_ADDITIONAL };
};

function ordenProductos(productos = {}) {
  return Object.entries(productos).map(([producto, cantidadStr]) => {
    const cantidad = parseInt(cantidadStr, 10) || 0;
    const precioUnitario = iLNapolitanoProductos[producto] ?? 0;

    return { producto, cantidad, precioUnitario };
  });
}

function agregarSubtotalyObtenertotal(lineas) {
  let total = 0;

  for (const linea of lineas) {
    linea.subtotal = linea.precioUnitario * linea.cantidad;
    total += linea.subtotal;
  }

  return total;
}

function formatearResumenPedido(lineasPedido = []) {
  const formatoCOP = new Intl.NumberFormat("es-CO");

  let total = 0;

  const filas = lineasPedido.map(({ producto, cantidad, precioUnitario }) => {
    const subTotal = cantidad * precioUnitario;
    total += subTotal;
    return `${cantidad} x ${producto} - $${formatoCOP.format(subTotal)}`;
  });

  const texto = [...filas].join("\n");

  const totalString = `$${formatoCOP.format(total)}`;

  return { texto, total, totalString };
}

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
      ...SCREEN_RESPONSES.ENTRADAS,
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      // handles when user submits PRODUCT_SELECTOR screen

      case "ENTRADAS":
        return {
          ...SCREEN_RESPONSES.SUGERENCIAS,
          data: {
            ...SCREEN_RESPONSES.SUGERENCIAS.data,
            ...data,
          },
        };

      case "SUGERENCIAS":
        return {
          ...SCREEN_RESPONSES.CANTIDADES,
          data: {
            ...SCREEN_RESPONSES.CANTIDADES.data,
            ...data,
          },
        };

      case "CANTIDADES":
        return {
          ...SCREEN_RESPONSES.ENSALADAS_POSTRES,
          data: {
            ...SCREEN_RESPONSES.ENSALADAS_POSTRES.data,
            ...data,
          },
        };

      case "ENSALADAS_POSTRES":
        return {
          ...SCREEN_RESPONSES.BEBIDAS,
          data: {
            ...SCREEN_RESPONSES.BEBIDAS.data,
            ...data,
          },
        };

      case "BEBIDAS":
        const {
          entradas = {},
          sugerencias = {},
          bebidas = {},
          obs_productos = "",
          obs_ENSALADAS_POSTRES = "",
        } = data ?? {};

        const productosPedido = {
          ...entradas,
          ...sugerencias,
          ...bebidas,
        };

        const lineasPedido = ordenProductos(productosPedido);
        const totalPedido = agregarSubtotalyObtenertotal(lineasPedido);
        const { texto, totalString } = formatearResumenPedido(lineasPedido);

        return {
          ...SCREEN_RESPONSES.RESUMEN_PEDIDO,
          data: {
            ...SCREEN_RESPONSES.RESUMEN_PEDIDO.data,
            mensaje: texto,
            valorTotal: totalPedido,
            valorTotalStr: totalString,
            obsProductos: obs_productos,
            obsAdcionales: obs_ENSALADAS_POSTRES,
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
