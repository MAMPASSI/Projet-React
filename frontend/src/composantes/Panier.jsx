
import React, { useState } from "react";
import Nav from "./Nav";


const initialProducts = [
  {
    id: 1,
    name: "T-shirt Premium",
    category: "Vêtement",
    price: 29.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
  },
  {
    id: 2,
    name: "Sneakers Classic",
    category: "Chaussures",
    price: 79.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
  },
  {
    id: 3,
    name: "Sac à dos",
    category: "Accessoires",
    price: 49.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
  },
];

export default function Cart() {
  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (id, amount) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(1, product.quantity + amount),
            }
          : product
      )
    );
  };

  const removeProduct = (id) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  const subtotal = products.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  const formatPrice = (price) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);

  return (
    <div className="p-5  md:px-[15%]">
        <Nav />
        <div className="min-h-screen  px-4 py-12">
        <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="mb-10">
            <h1 className="text-3xl font-bold text-white">
                Mon panier
            </h1>
            <p className="mt-2 text-white">
                {products.length} produit(s) dans votre panier
            </p>
            </div>

            {products.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                <div className="mb-4 text-5xl"></div>
                <h2 className="text-xl font-bold text-gray-800">
                Votre panier est vide
                </h2>
                <p className="mt-2 text-gray-500">
                Découvrez nos produits et ajoutez-les à votre panier.
                </p>
                <button className="mt-6 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800">
                Continuer mes achats
                </button>
            </div>
            ) : (
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

                {/* Products */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-2">

                {/* Table Header */}
                <div className="hidden grid-cols-12 border-b px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500 md:grid">
                    <div className="col-span-5">Produit</div>
                    <div className="col-span-2 text-center">Prix</div>
                    <div className="col-span-3 text-center">Quantité</div>
                    <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Product List */}
                {products.map((product) => (
                    <div
                    key={product.id}
                    className="grid grid-cols-1 gap-4 border-b p-6 last:border-0 md:grid-cols-12 md:items-center"
                    >
                    {/* Product */}
                    <div className="flex items-center gap-4 md:col-span-5">
                        <img
                        src={product.image}
                        alt={product.name}
                        className="h-24 w-20 rounded-lg bg-gray-100 object-cover"
                        />

                        <div>
                        <h3 className="font-semibold text-gray-900">
                            {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {product.category}
                        </p>

                        <button
                            onClick={() => removeProduct(product.id)}
                            className="mt-3 text-sm text-red-500 hover:text-red-700"
                        >
                            Supprimer
                        </button>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between text-sm md:col-span-2 md:justify-center">
                        <span className="text-gray-500 md:hidden">
                        Prix :
                        </span>
                        <span className="font-medium">
                        {formatPrice(product.price)}
                        </span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between md:col-span-3 md:justify-center">
                        <span className="text-sm text-gray-500 md:hidden">
                        Quantité :
                        </span>

                        <div className="flex items-center overflow-hidden rounded-lg border">
                        <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="px-3 py-2 hover:bg-gray-100"
                        >
                            −
                        </button>

                        <span className="min-w-10 text-center text-sm font-medium">
                            {product.quantity}
                        </span>

                        <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="px-3 py-2 hover:bg-gray-100"
                        >
                            +
                        </button>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between text-sm md:col-span-2 md:justify-end">
                        <span className="text-gray-500 md:hidden">
                        Total :
                        </span>
                        <span className="font-bold text-gray-900">
                        {formatPrice(product.price * product.quantity)}
                        </span>
                    </div>
                    </div>
                ))}

                {/* Continue Shopping */}
                <div className="p-6">
                    <button className="text-sm font-semibold text-gray-600 hover:text-black">
                    ← Continuer mes achats
                    </button>
                </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                    Résumé de la commande
                </h2>

                <div className="space-y-4 border-b pb-6">
                    <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sous-total</span>
                    <span className="font-medium">
                        {formatPrice(subtotal)}
                    </span>
                    </div>

                    <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Livraison</span>
                    <span className="font-medium">
                        {shipping === 0 ? "Gratuite" : formatPrice(shipping)}
                    </span>
                    </div>
                </div>

                <div className="flex justify-between py-6">
                    <span className="font-bold text-gray-900">
                    Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                    {formatPrice(total)}
                    </span>
                </div>

                <p className="mb-5 text-xs text-gray-400">
                    {subtotal >= 100
                    ? "Vous bénéficiez de la livraison gratuite."
                    : "Livraison gratuite dès 100 € d'achat."}
                </p>

                <button
                    disabled={products.length === 0}
                    onClick={() => alert("Passage à la commande !")}
                    className="w-full rounded-lg bg-black py-4 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
                >
                    Passer la commande →
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                    Paiement sécurisé
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    </div>
    
  );
}
