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
      ...SCREEN_RESPONSES.Inicio,
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      case "Inicio":
        return {
          ...SCREEN_RESPONSES.Productos,
          data: {
            ...SCREEN_RESPONSES.Productos.data,
            ...data,
          },
        };

      case "Productos":
        return {
          ...SCREEN_RESPONSES.Cantidades,
          data: {
            ...SCREEN_RESPONSES.Cantidades.data,
            ...data,
          },
        };

      case "Cantidades":
        return {
          ...SCREEN_RESPONSES.Bebidas,
          data: {
            ...SCREEN_RESPONSES.Bebidas.data,
            ...data,
          },
        };

      case "Bebidas":
        const { resumenStr, totalGeneral, totalGeneralStr } =
          generarDatosPedido(data);
        return {
          ...SCREEN_RESPONSES.Resumen,
          data: {
            resumen: resumenStr,
            valorPedido: totalGeneral,
            valorPedidoStr: totalGeneralStr,
          },
        };

      case "Resumen":
        return {
          ...SCREEN_RESPONSES.Formulario,
          data: {
            ...SCREEN_RESPONSES.Formulario.data,
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
