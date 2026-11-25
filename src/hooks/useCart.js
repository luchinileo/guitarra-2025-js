import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

const MIN_ITEMS = 1
const MAX_ITEMS = 5

// Suma 1 a un producto del carrito, sin pasar del máximo
const increaseItem = (cart, id) =>
    cart.map(item =>
        item.id === id && item.quantity < MAX_ITEMS
            ? { ...item, quantity: item.quantity + 1 }
            : item
    )

const initialCart = () => {
    try {
        const localStorageCart = localStorage.getItem("cart")
        if (!localStorageCart) return []

        // Tomamos los datos actuales de cada producto desde db (precio, imagen, nombre)
        // y del carrito guardado conservamos solo la cantidad.
        // Así un carrito viejo nunca muestra precios desactualizados ni imágenes rotas.
        return JSON.parse(localStorageCart)
            .map(savedItem => {
                const product = db.find(guitar => guitar.id === savedItem.id)
                return product ? { ...product, quantity: savedItem.quantity } : null
            })
            .filter(Boolean)
    } catch {
        // Si el dato guardado está corrupto, empezamos con el carrito vacío
        return []
    }
}

export const useCart = () => {
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    // Todas las actualizaciones usan la forma setCart(prevCart => ...).
    // Así React nos da siempre el carrito más reciente, aunque lleguen
    // varios clics seguidos antes de que se vuelva a renderizar.

    function addToCart(item) {
        setCart(prevCart => {
            const itemExists = prevCart.some(guitar => guitar.id === item.id)

            // Si ya está en el carrito, sumamos 1 (respetando el máximo).
            // Si no, agregamos un objeto nuevo sin modificar el original de db.
            return itemExists
                ? increaseItem(prevCart, item.id)
                : [...prevCart, { ...item, quantity: 1 }]
        })
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function decreaseQuantity(id) {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id && item.quantity > MIN_ITEMS
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        )
    }

    function increaseQuantity(id) {
        setCart(prevCart => increaseItem(prevCart, id))
    }

    function clearCart() {
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    )
    // Cantidad total de unidades (ej.: 2 Aurora + 1 Sol = 3)
    const cartCount = useMemo(
        () => cart.reduce((total, item) => total + item.quantity, 0),
        [cart]
    )

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
        cartCount
    }
}
