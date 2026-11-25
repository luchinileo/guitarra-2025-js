import { useState, useEffect, useRef } from "react"
import { formatCurrency } from "../helpers"

export default function Header({
    cart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
    cartCount
}) {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const cartRef = useRef(null)       // todo el bloque del carrito (botón + panel)
    const toggleRef = useRef(null)     // el botón que abre y cierra

    // Mientras el carrito está abierto, escuchamos dos eventos para cerrarlo:
    // un toque o clic fuera del carrito, y la tecla Escape.
    useEffect(() => {
        if (!isCartOpen) return

        function handlePointerDown(event) {
            if (!cartRef.current.contains(event.target)) {
                setIsCartOpen(false)
            }
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setIsCartOpen(false)
                toggleRef.current.focus() // devolvemos el foco al botón del carrito
            }
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        // Limpieza: al cerrarse el carrito, dejamos de escuchar
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isCartOpen])

    return (
        <header className="header">
            <div className="container header__bar">
                <a href="/" className="logo" aria-label="SoundHouse - Inicio">
                    <img className="logo__icon" src="/img/soundhouse-icon.svg" alt="" />
                    <span className="logo__text">
                        Sound<strong>House</strong>
                    </span>
                </a>

                <div className="cart" ref={cartRef}>
                    <button
                        type="button"
                        ref={toggleRef}
                        className="cart__toggle"
                        aria-label={`Carrito: ${cartCount} ${cartCount === 1 ? "producto" : "productos"}`}
                        aria-expanded={isCartOpen}
                        aria-controls="cart-panel"
                        onClick={() => setIsCartOpen(open => !open)}
                    >
                        <img src="/img/cart.svg" alt="" />
                        {cartCount > 0 && (
                            <span className="cart__count" aria-hidden="true">{cartCount}</span>
                        )}
                    </button>

                    <div
                        id="cart-panel"
                        className={`cart__panel ${isCartOpen ? "cart__panel--open" : ""}`}
                    >
                        {isEmpty ? (
                            <p className="cart__empty">El carrito está vacío</p>
                        ) : (
                            <>
                                <ul className="cart__list">
                                    {cart.map(guitar => (
                                        <li key={guitar.id} className="cart-item">
                                            <img
                                                className="cart-item__image"
                                                src={`/img/${guitar.image}.jpg`}
                                                alt={`Guitarra ${guitar.name}`}
                                            />
                                            <div>
                                                <p className="cart-item__name">{guitar.name}</p>
                                                <p className="cart-item__price">{formatCurrency(guitar.price)}</p>
                                            </div>
                                            <div className="cart-item__quantity">
                                                <button
                                                    type="button"
                                                    className="btn-icon"
                                                    aria-label={`Restar una ${guitar.name}`}
                                                    onClick={() => decreaseQuantity(guitar.id)}
                                                >
                                                    -
                                                </button>
                                                <span>{guitar.quantity}</span>
                                                <button
                                                    type="button"
                                                    className="btn-icon"
                                                    aria-label={`Sumar una ${guitar.name}`}
                                                    onClick={() => increaseQuantity(guitar.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-icon btn-icon--remove"
                                                aria-label={`Eliminar ${guitar.name} del carrito`}
                                                onClick={() => removeFromCart(guitar.id)}
                                            >
                                                ×
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <p className="cart__total">
                                    Total a pagar: <strong>{formatCurrency(cartTotal)}</strong>
                                </p>
                            </>
                        )}

                        <button
                            type="button"
                            className="btn btn--outline btn--block"
                            onClick={clearCart}
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </div>

            <div className="container hero">
                <p className="hero__eyebrow">Tienda de instrumentos musicales</p>
                <h1 className="hero__title">
                    Encontrá el sonido <span>que te define</span>
                </h1>
                <p className="hero__text">
                    Guitarras eléctricas, acústicas, clásicas y bajos para cada etapa de tu música.
                </p>
                <a href="#catalogo" className="btn btn--primary">Ver catálogo</a>
            </div>
        </header>
    )
}
