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
      ...SCREEN_RESPONSES.Pizzas,
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      case "Pizzas":
        return {
          ...SCREEN_RESPONSES.Sandwiches,
          data: {
            ...SCREEN_RESPONSES.Sandwiches.data,
            ...data,
          },
        };

      case "Sandwiches":
        return {
          ...SCREEN_RESPONSES.Lasagnas,
          data: {
            ...SCREEN_RESPONSES.Lasagnas.data,
            ...data,
          },
        };

      case "Lasagnas":
        return {
          ...SCREEN_RESPONSES.Spaguettis,
          data: {
            ...SCREEN_RESPONSES.Spaguettis.data,
            ...data,
          },
        };

      case "Spaguettis":
        return {
          ...SCREEN_RESPONSES.Strombolis,
          data: {
            ...SCREEN_RESPONSES.Strombolis.data,
            ...data,
          },
        };

      case "Strombolis":
        return {
          ...SCREEN_RESPONSES.Variedades,
          data: {
            ...SCREEN_RESPONSES.Variedades.data,
            ...data,
          },
        };

      case "Variedades":
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

      default:
        break;
    }
  }

  console.error("Unhandled request body:", decryptedBody);
  throw new Error(
    "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
  );
};
