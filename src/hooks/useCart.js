import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

const MIN_ITEMS = 1
const MAX_ITEMS = 5

const initialCart = () => {
    try {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
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

    function addToCart(item) {
        const itemExists = cart.some(guitar => guitar.id === item.id)

        if (itemExists) {
            // Si ya está en el carrito, sumamos 1 (respetando el máximo)
            increaseQuantity(item.id)
        } else {
            // Creamos un objeto nuevo en lugar de modificar el original de db
            setCart([...cart, { ...item, quantity: 1 }])
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
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
        cartTotal
    }
}
