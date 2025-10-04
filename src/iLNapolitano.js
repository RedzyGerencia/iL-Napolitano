import { iLNapolitanoProductos } from "./iLNapolitanoProductos.js";
import { selector_cantidades } from "./components.js";

const SCREEN_RESPONSES = {
  SERVICIOS: {
    screen: "SERVICIOS",
    data: {
      chk_domicilio: false,
      chk_reserva: false,
    },
  },

  RESERVAS: {
    screen: "RESERVAS",
    data: {},
  },

  CREAR_RESERVA: {
    screen: "CREAR_RESERVA",
    data: {},
  },

  ENTRADAS: {
    screen: "ENTRADAS",
    data: {
      chk_entrada_1: false,
      chk_entrada_2: false,
      chk_entrada_3: false,
      chk_entrada_4: false,
      chk_entrada_5: false,
      chk_entrada_6: false,
      chk_entrada_7: false,
      chk_entrada_8: false,
      chk_entrada_9: false,
      chk_entrada_10: false,
    },
  },

  CANT_ENTRADAS: {
    screen: "CANT_ENTRADAS",
    data: {
      chk_entrada_1: false,
      chk_entrada_2: false,
      chk_entrada_3: false,
      chk_entrada_4: false,
      chk_entrada_5: false,
      chk_entrada_6: false,
      chk_entrada_7: false,
      chk_entrada_8: false,
      chk_entrada_9: false,
      chk_entrada_10: false,
      selector_cantidades,
    },
  },

  SUGERENCIAS: {
    screen: "SUGERENCIAS",
    data: {
      chk_sug_1: false,
      chk_sug_2: false,
      chk_sug_3: false,
      chk_sug_4: false,
      chk_sug_5: false,
      chk_sug_6: false,
      chk_sug_7: false,
      chk_sug_8: false,
      chk_sug_9: false,
      chk_sug_10: false,
      chk_sug_11: false,
      chk_sug_12: false,
      chk_sug_13: false,
      chk_sug_14: false,
      chk_sug_15: false,
      chk_sug_16: false,
      chk_sug_17: false,
      chk_sug_18: false,
      chk_sug_19: false,
      chk_sug_20: false,
      chk_sug_21: false,
      chk_sug_22: false,
      chk_sug_23: false,
      chk_sug_24: false,
      chk_sug_25: false,
      chk_sug_26: false,
      chk_sug_27: false,
      chk_sug_28: false,
      chk_sug_29: false,
      chk_sug_30: false,
      chk_sug_31: false,
      chk_sug_32: false,
      chk_sug_33: false,
      chk_sug_34: false,
      chk_sug_35: false,
      chk_sug_36: false,
      chk_sug_37: false,
      chk_sug_38: false,
    },
  },

  CANTIDADES: {
    screen: "CANTIDADES",
    data: {
      chk_sug_1: false,
      chk_sug_2: false,
      chk_sug_3: false,
      chk_sug_4: false,
      chk_sug_5: false,
      chk_sug_6: false,
      chk_sug_7: false,
      chk_sug_8: false,
      chk_sug_9: false,
      chk_sug_10: false,
      chk_sug_11: false,
      chk_sug_12: false,
      chk_sug_13: false,
      chk_sug_14: false,
      chk_sug_15: false,
      chk_sug_16: false,
      chk_sug_17: false,
      chk_sug_18: false,
      chk_sug_19: false,
      chk_sug_20: false,
      chk_sug_21: false,
      chk_sug_22: false,
      chk_sug_23: false,
      chk_sug_24: false,
      chk_sug_25: false,
      chk_sug_26: false,
      chk_sug_27: false,
      chk_sug_28: false,
      chk_sug_29: false,
      chk_sug_30: false,
      chk_sug_31: false,
      chk_sug_32: false,
      chk_sug_33: false,
      chk_sug_34: false,
      chk_sug_35: false,
      chk_sug_36: false,
      chk_sug_37: false,
      chk_sug_38: false,
      selector_cantidades,
    },
  },

  ENSALADAS_POSTRES: {
    screen: "ENSALADAS_POSTRES",
    data: {
      chk_ens_1: false,
      chk_ens_2: false,
      chk_ens_3: false,
      chk_pos_1: false,
      chk_pos_2: false,
      chk_pos_3: false,
      chk_pos_4: false,
      chk_pos_5: false,
      chk_pos_6: false,
      chk_pos_7: false,
      chk_pos_8: false,
      selector_cantidades,
    },
  },

  BEBIDAS: {
    screen: "BEBIDAS",
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
      chk_beb_11: false,
      chk_beb_12: false,
      chk_beb_13: false,
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
      ...SCREEN_RESPONSES.SERVICIOS,
      data: {
        ...SCREEN_RESPONSES.SERVICIOS.data,
      },
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen

    switch (screen) {
      case "SERVICIOS":
        if (data.chk_reserva) {
          return {
            ...SCREEN_RESPONSES.RESERVAS,
            data: {
              ...SCREEN_RESPONSES.RESERVAS.data,
              ...data,
            },
          };
        } else {
          return {
            ...SCREEN_RESPONSES.ENTRADAS,
            data: {
              ...SCREEN_RESPONSES.ENTRADAS.data,
              ...data,
            },
          };
        }

      case "RESERVAS":
        const url =
          "https://api.apparta.co/table-availability-template-schedule-getAvailabilityBySlot";

        async function consultarDisponibilidad(fecha, hora, asistentes) {
          const params = {
            meta_reservation_date: fecha,
            meta_reservation_start_time: hora,
            meta_reservation_persons: asistentes,
            establishment_id: 2094,
            establishment_branch_id: 6934,
          };

          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(params),
            });

            const data = await response.json();
            const available = data.availability === "true";
            return available;
          } catch (error) {
            return false;
          }
        }

        const chk_disponibilidad = await consultarDisponibilidad(
          data.fecha_reserva,
          data.hora_reserva,
          data.asistentes_reserva
        );

        return {
          ...SCREEN_RESPONSES.CREAR_RESERVA,
          data: {
            ...SCREEN_RESPONSES.CREAR_RESERVA.data,
            ...data,
            chk_disponibilidad,
          },
        };

      case "ENTRADAS":
        let chkEntrada = false;

        for (const key in data) {
          if (key.startsWith("chk_entrada_") && data[key] === true) {
            chkEntrada = true;
            break;
          }
        }

        if (chkEntrada) {
          return {
            ...SCREEN_RESPONSES.CANT_ENTRADAS,
            data: {
              ...SCREEN_RESPONSES.CANT_ENTRADAS.data,
              ...data,
            },
          };
        } else {
          return {
            ...SCREEN_RESPONSES.SUGERENCIAS,
            data: {
              ...SCREEN_RESPONSES.SUGERENCIAS.data,
              ...data,
            },
          };
        }

      case "CANT_ENTRADAS":
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
          ensaladasPostres = {},
          bebidas = {},
          obs_productos = "",
          obs_ENSALADAS_POSTRES = "",
        } = data ?? {};

        const productosPedido = {
          ...entradas,
          ...sugerencias,
          ...ensaladasPostres,
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
