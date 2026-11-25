import { formatCurrency } from "../helpers"

export default function Guitar({ guitar, addToCart }) {
    const { name, image, description, price } = guitar

    return (
        <article className="card">
            <img
                className="card__image"
                src={`/img/${image}.jpg`}
                alt={`Guitarra ${name}`}
                width="800"
                height="1000"
                loading="lazy"
            />
            <div className="card__body">
                <h3 className="card__title">{name}</h3>
                <p className="card__description">{description}</p>
                <p className="card__price">{formatCurrency(price)}</p>
                <button
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={() => addToCart(guitar)}
                >
                    Agregar al carrito
                </button>
            </div>
        </article>
    )
}
