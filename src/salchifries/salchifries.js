import { generarDatosPedido } from "./functions.js";
import { SCREEN_RESPONSES } from "./screens.js";

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

      case "CANT_ADC":
        return {
          ...SCREEN_RESPONSES.BEBIDAS,
          data: {
            ...SCREEN_RESPONSES.BEBIDAS.data,
            ...data,
          },
        };

      case "BEBIDAS":
        let chkBebidas = false;

        for (const key in data) {
          if (key.startsWith("chk_bebida_") && data[key] === true) {
            chkBebidas = true;
            break;
          }
        }

        if (chkBebidas) {
          return {
            ...SCREEN_RESPONSES.CANT_BEBIDAS,
            data: {
              ...SCREEN_RESPONSES.CANT_BEBIDAS.data,
              ...data,
            },
          };
        } else {
          const { totalGeneral, totalGeneralStr, resumenStr } =
            generarDatosPedido(data);
          return {
            ...SCREEN_RESPONSES.RESUMEN_PEDIDO,
            data: {
              mensaje: resumenStr,
              valorTotal: totalGeneral,
              valorTotalStr: totalGeneralStr,
            },
          };
        }

      case "CANT_BEBIDAS":
        const { totalGeneral, totalGeneralStr, resumenStr } =
          generarDatosPedido(data);
        return {
          ...SCREEN_RESPONSES.RESUMEN_PEDIDO,
          data: {
            mensaje: resumenStr,
            valorTotal: totalGeneral,
            valorTotalStr: totalGeneralStr,
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
