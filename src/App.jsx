import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useCart } from "./hooks/useCart"

function App() {
    const {
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
    } = useCart()

    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                clearCart={clearCart}
                isEmpty={isEmpty}
                cartTotal={cartTotal}
                cartCount={cartCount}
            />

            <main id="catalogo" className="container catalog">
                <h2 className="section-title">
                    Nuestra <span>Colección</span>
                </h2>

                <div className="catalog__grid">
                    {data.map(guitar => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            <footer className="footer">
                <div className="container footer__content">
                    <a href="/" className="logo" aria-label="SoundHouse - Inicio">
                        <img className="logo__icon" src="/img/soundhouse-icon.svg" alt="" />
                        <span className="logo__text">
                            Sound<strong>House</strong>
                        </span>
                    </a>
                    <p className="footer__text">
                        © {new Date().getFullYear()} SoundHouse · Proyecto de portfolio. Fotos de Unsplash.
                    </p>
                </div>
            </footer>
        </>
    )
}

export default App
