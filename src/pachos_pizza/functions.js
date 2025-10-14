import { productos, tamanos, bebidas } from "./products.js";

export function generarDatosPedido(data) {
  let totalPizzasTradicionales = 0;
  let totalPizzasEspeciales = 0;
  let totalPizzasBordeQueso = 0;
  let totalProductos = 0;
  let totalBebidas = 0;
  let resumen = [];

  for (const key in data.pizzas_tradicionales) {
    const pizza = data.pizzas_tradicionales[key];
    const chk = pizza[`chk_${key}`];

    if (!chk) continue;
    if (!pizza.tamano) continue;
    if (!pizza.sabor) continue;

    const tam = pizza.tamano;
    const sabor = pizza.sabor;

    const precioPizza = tamanos[tam] || 0;
    totalPizzasTradicionales += precioPizza;

    resumen.push({
      tipo: "pizza tradicional",
      producto: `${sabor} ${tam}`,
      precio: precioPizza,
    });
  }

  for (const key in data.pizzas_especiales) {
    const pizza = data.pizzas_especiales[key];
    const chk = pizza[`chk_${key}`];

    if (!chk) continue;
    if (!pizza.tamano) continue;
    if (!pizza.sabor) continue;

    const tam = pizza.tamano;
    const sabor = pizza.sabor;

    const precioPizza = tamanos[tam] || 0;
    totalPizzasEspeciales += precioPizza;

    resumen.push({
      tipo: "pizza especial",
      producto: `${sabor} ${tam}`,
      precio: precioPizza,
    });
  }

  for (const key in data.pizzas_bordequeso) {
    const pizza = data.pizzas_bordequeso[key];
    const chk = pizza[`chk_${key}`];

    if (!chk) continue;
    if (!pizza.tamano) continue;
    if (!pizza.sabor) continue;

    const tam = pizza.tamano;
    const sabor = pizza.sabor;

    const precioPizza = tamanos[tam] || 0;
    totalPizzasBordeQueso += precioPizza;

    resumen.push({
      tipo: "pizza borde queso",
      producto: `${sabor} ${tam}`,
      precio: precioPizza,
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

  const totalGeneral =
    totalPizzasTradicionales +
    totalPizzasEspeciales +
    totalPizzasBordeQueso +
    totalProductos +
    totalBebidas;

  const formatCOP = (valor) =>
    `$${valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  let texto = "";
  resumen.forEach((item) => {
    if (item.tipo === "pizza tradicional") {
      texto += `Pizza Tradicional\n`;
      texto += `${item.producto}\n`;
      texto += `Subtotal: ${formatCOP(item.precio)}\n\n`;
    }

    if (item.tipo === "pizza especial") {
      texto += `Pizza Especial\n`;
      texto += `${item.producto}\n`;
      texto += `Subtotal: ${formatCOP(item.precio)}\n\n`;
    }

    if (item.tipo === "pizza borde queso") {
      texto += `Pizza Borde Queso\n`;
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
