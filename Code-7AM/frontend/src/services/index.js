export const getTopCollection = (products, type) => {
    const items = products.filter(p => {
        return p.category === type;
    });

    return type != "" ? items.slice(0, 8) : products.slice(0, 8);
}

export const getBestSeller = products => {
    const items = products.filter(p => {
        return p.isSale === 1;
    });

    return items.slice(0, 8);
}

export const getMenWear = products => {
    const items = products.filter(p => {
        return p.category === 'men';
    });

    return items.slice(0, 8);
}


export const getWomenWear = products => {
    const items = products.filter(p => {
        return p.category === 'women';
    });

    return items.slice(0, 8);
}

export const getCartTotal = cartItems => {
    var total = 0;

    for (let i = 0; i < cartItems.length; i++) {
        total += parseInt(cartItems[i].qty) * (cartItems[i].price - cartItems[i].discount)
    }

    return total;
}

// Get Unique Brands
export const getBrands = (products) => {
    var uniqueBrands = [];
    products.map((product, index) => {
        if (product.tags) {
            product.tags.map((tag) => {
                if (uniqueBrands.indexOf(tag) === -1) {
                    uniqueBrands.push(tag);
                }
            })
        }
    })
    return uniqueBrands;
}

// Get Unique Colors
export const getColors = (products) => {
    var uniqueColors = [];
    products.map((product, index) => {
        if (product.colors) {
            product.colors.map((color) => {
                if (uniqueColors.indexOf(color) === -1) {
                    uniqueColors.push(color);
                }
            })
        }
    })
    return uniqueColors;
}

// Get Minimum and Maximum Prices from Json Data
export const getMinMaxPrice = (products) => {
    let min = 100, max = 1000;

    products.map((product, index) => {
        let v = product.price;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
    });

    return { 'min': min, 'max': max };
}

export const getVisibleproducts = (data, { brand, color, value }, category) => {
    let items = [];

    if (category) {
        items = data.products.filter(product => {
            return product.category === category
        })
    } else {
        items = data.products;
    }

    return items.filter(product => {
        debugger;
        let brandMatch;
        if (product.tags) {
            brandMatch = product.tags.some(tag => brand.includes(tag))
        }
        else {
            brandMatch = true;
        }

        let colorMatch;
        if (color && product.colors) {
            colorMatch = product.colors.includes(color)
        } else {
            colorMatch = true;
        }

        const startPriceMatch = typeof value.min !== 'number' || value.min <= product.price;
        const endPriceMatch = typeof value.max !== 'number' || product.price <= value.max;

        return brandMatch && colorMatch && startPriceMatch && endPriceMatch;
    });
}