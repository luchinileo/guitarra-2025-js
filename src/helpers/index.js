// Formatea un número como precio en pesos argentinos: 1180000 -> "$ 1.180.000"
const currencyFormatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
})

export function formatCurrency(amount) {
    return currencyFormatter.format(amount)
}
