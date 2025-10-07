import { pizzas, productos, bebidas } from "./products.js";

export function generarDatosPedido(data) {
  let totalPizzas = 0;
  let totalProductos = 0;
  let totalBebidas = 0;
  let resumen = [];

  for (const key in data.pizzas) {
    const pizza = data.pizzas[key];
    const chk = pizza[`chk_${key}`];

    if (!chk) continue;
    if (!pizza.tamano) continue;
    if (!pizza.sabor_1) continue;

    const tam = pizza.tamano;
    const sabor = pizza.sabor_1;

    const clave = `${sabor} ${tam}`;
    const precio = pizzas[tam] || 0;

    totalPizzas += precio;

    resumen.push({
      tipo: "pizza",
      producto: clave,
      precio,
    });
  }

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

  const totalGeneral = totalPizzas + totalProductos + totalBebidas;

  const formatCOP = (valor) =>
    `$${valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  let texto = "";
  resumen.forEach((item) => {
    if (item.tipo === "pizza") {
      texto += `Pizza\n`;
      texto += `${item.producto}\n`;
      texto += `Subtotal: ${formatCOP(item.precio)}\n\n`;
    }

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
