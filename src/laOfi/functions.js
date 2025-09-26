import { productos, bebidas } from "./products.js";

export function generarDatosPedido(data) {
  let totalProductos = 0;
  let totalBebidas = 0;
  let resumen = [];

  for (const producto in data.productos) {
    const cantidad = Number(data.productos[producto]);
    if (!cantidad) continue;

    const precioUnitario = productos[producto] || 0;
    const subtotal = precioUnitario * cantidad;
    totalProductos += subtotal;

    resumen.push({
      tipo: "producto",
      producto: producto,
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

  const totalGeneral = totalProductos + totalBebidas;

  const formatCOP = (valor) =>
    `$${valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  let texto = "";
  resumen.forEach((item) => {
    if (item.tipo === "producto") {
      texto += `Producto\n`;
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
    totalGeneral,
    totalGeneralStr,
    resumenStr: texto.trim(),
  };
}
