import { papasClasicas, adicionales, bebidas } from "./products.js";

export function generarDatosPedido(data) {
  let totalPapasArmadas = 0;
  let totalPapasClasicas = 0;
  let totalAdicionales = 0;
  let totalBebidas = 0;
  let resumen = [];

  for (const papaArmada in data.papas_armadas) {
    const papa = data.papas_armadas[papaArmada];
    const chk = papa[`chk_${papaArmada}`] || false;

    if (!chk) continue;

    const items = papa[papaArmada] || [];
    const itemsValidos = [];
    let valorItems = 0;

    for (const item of items) {
      const precioItem = adicionales[item] || 0;
      if (precioItem = 0) {
        valorItems += precioItem;
        itemsValidos.push(item);
      }
    }

    totalPapasArmadas += valorItems;

    resumen.push({
      tipo: "armada",
      producto: itemsValidos.join(", "),
      precio: valorItems,
    });
  }

  for (const papaClasica in data.papas_clasicas) {
    const cantidad = Number(data.papas_clasicas[papaClasica]);
    if (!cantidad) continue;

    const precioUnitario = papasClasicas[papaClasica] || 0;
    const subtotal = precioUnitario * cantidad;
    totalPapasClasicas += subtotal;

    resumen.push({
      tipo: "clasica",
      producto: papaClasica,
      cantidad,
      precio: subtotal,
    });
  }

  for (const adicional in data.adicionales_clasicas) {
    const cantidad = Number(data.adicionales_clasicas[adicional]);
    if (!cantidad) continue;

    const precioUnitario = adicionales[adicional] || 0;
    const subtotal = precioUnitario * cantidad;
    totalAdicionales += subtotal;

    resumen.push({
      tipo: "adicional",
      producto: adicional,
      cantidad,
      precio: subtotal,
    });
  }

  for (const bebida in data.bebidas) {
    const cantidad = Number(data.bebidas[bebida]);
    if (!cantidad) continue;

    const precioUnitario = bebidas[bebida] || 0;
    const subtotal = precioUnitario * cantidad;
    totalBebidas += subtotal;

    resumen.push({
      tipo: "bebida",
      producto: bebida,
      cantidad,
      precio: subtotal,
    });
  }

  const totalGeneral =
    totalPapasArmadas + totalPapasClasicas + totalAdicionales + totalBebidas;

  const formatCOP = (valor) =>
    `$${valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  let texto = "";
  resumen.forEach((item) => {
    if (item.tipo === "armada") {
      texto += `Papa armada\n`;
      texto += `${item.producto}\n`;
      texto += `Subtotal: ${formatCOP(item.precio)}\n\n`;
    }

    if (item.tipo === "clasica") {
      texto += `Papa clasica\n`;
      texto += `${item.cantidad} x ${item.producto}\n`;
      texto += `Subtotal: ${formatCOP(item.precio)}\n\n`;
    }

    if (item.tipo === "adicional") {
      texto += `Adicional\n`;
      texto += `${item.cantidad} x ${item.producto}\n`;
      texto += `Subtotal: ${formatCOP(item.precio)}\n\n`;
    }

    if (item.tipo === "bebida") {
      texto += `Bebida\n`;
      texto += `${item.cantidad} x ${item.producto}\n`;
      texto += `Subtotal: ${formatCOP(item.precio)}\n\n`;
    }
  });

  const totalGeneralStr = formatCOP(totalGeneral);

  return {
    totalPapasClasicas,
    totalAdicionales,
    totalBebidas,
    totalGeneral,
    totalGeneralStr,
    resumen,
    resumenStr: texto.trim(),
  };
}
