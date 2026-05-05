const defaultProducts = [
    {
        id: 'p1',
        title: 'Navy Blue Tailored Suit',
        price: 850.00,
        category: 'suits',
        image: 'https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&auto=format&fit=crop',
        description: 'A sharp, two-piece navy blue suit tailored from premium Italian wool. Perfect for business or formal events.',
        trendingScore: 95,
        variants: [
            { size: '38R', stock: 5 }, { size: '40R', stock: 2 }, { size: '42R', stock: 8 }, { size: '44R', stock: 1 }, { size: '46R', stock: 0 }
        ]
    },
    {
        id: 'p2',
        title: 'Classic White Oxford Shirt',
        price: 120.00,
        category: 'shirts',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e32f85f98?w=800&auto=format&fit=crop',
        description: 'Crisp, perfectly tailored organic cotton shirt for any occasion.',
        trendingScore: 88,
        variants: [
            { size: 'S', stock: 10 }, { size: 'M', stock: 15 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 3 }, { size: 'XXL', stock: 2 }
        ]
    },
    {
        id: 'p3',
        title: 'Italian Leather Oxford Shoes',
        price: 320.00,
        category: 'shoes',
        image: 'https://images.unsplash.com/photo-1614252339460-e1b18c734812?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop',
        description: 'Handcrafted leather oxford shoes featuring a sleek polished finish and unmatched durability.',
        trendingScore: 92,
        variants: [
            { size: 'US 8', stock: 4 }, { size: 'US 9', stock: 6 }, { size: 'US 10', stock: 5 }, { size: 'US 11', stock: 2 }, { size: 'US 12', stock: 0 }
        ]
    },
    {
        id: 'p4',
        title: 'Slim Fit Chino Trousers',
        price: 145.00,
        category: 'trousers',
        image: 'https://images.unsplash.com/photo-1624378439575-d1ead6bb176d?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop',
        description: 'Versatile slim-fit chinos crafted from stretch-cotton twill for all-day comfort.',
        trendingScore: 75,
        variants: [
            { size: '30W', stock: 12 }, { size: '32W', stock: 10 }, { size: '34W', stock: 8 }, { size: '36W', stock: 5 }, { size: '38W', stock: 0 }
        ]
    },
    {
        id: 'p5',
        title: 'Cashmere Blend Overcoat',
        price: 495.00,
        category: 'outerwear',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop',
        description: 'An unstructured cashmere blend overcoat featuring a minimalist design and unmatched warmth.',
        trendingScore: 85,
        variants: [
            { size: 'S', stock: 3 }, { size: 'M', stock: 1 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 2 }, { size: 'XXL', stock: 0 }
        ]
    },
    {
        id: 'p6',
        title: 'Suede Chelsea Boots',
        price: 275.00,
        category: 'shoes',
        image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop',
        description: 'Classic Chelsea boots crafted from premium water-resistant suede with elastic side panels.',
        trendingScore: 89,
        variants: [
            { size: 'US 8', stock: 6 }, { size: 'US 9', stock: 5 }, { size: 'US 10', stock: 8 }, { size: 'US 11', stock: 3 }, { size: 'US 12', stock: 1 }
        ]
    },
    {
        id: 'p7',
        title: 'Charcoal Grey Wool Suit',
        price: 790.00,
        category: 'suits',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1594938328870-98242136610fb?w=800&auto=format&fit=crop',
        description: 'A modern classic, this charcoal grey suit offers a sharp silhouette and year-round wearability.',
        trendingScore: 82,
        variants: [
            { size: '38R', stock: 4 }, { size: '40R', stock: 6 }, { size: '42R', stock: 3 }, { size: '44R', stock: 1 }, { size: '46R', stock: 0 }
        ]
    },
    {
        id: 'p8',
        title: 'Linen Button-Down Shirt',
        price: 110.00,
        category: 'shirts',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85f98?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop',
        description: 'Breathable linen shirt in a relaxed fit, perfect for warm weather or layered looks.',
        trendingScore: 78,
        variants: [
            { size: 'S', stock: 8 }, { size: 'M', stock: 12 }, { size: 'L', stock: 5 }, { size: 'XL', stock: 4 }, { size: 'XXL', stock: 2 }
        ]
    },
    {
        id: 'p9',
        title: 'Minimalist White Sneakers',
        price: 160.00,
        category: 'shoes',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&auto=format&fit=crop',
        description: 'Essential white sneakers featuring premium leather uppers and a comfortable rubber sole.',
        trendingScore: 96,
        variants: [
            { size: 'US 8', stock: 15 }, { size: 'US 9', stock: 20 }, { size: 'US 10', stock: 12 }, { size: 'US 11', stock: 8 }, { size: 'US 12', stock: 4 }
        ]
    },
    {
        id: 'p10',
        title: 'Leather Biker Jacket',
        price: 550.00,
        category: 'outerwear',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&auto=format&fit=crop',
        description: 'The ultimate staple piece, crafted from buttery soft lambskin leather with heavy-duty hardware.',
        trendingScore: 91,
        variants: [
            { size: 'S', stock: 2 }, { size: 'M', stock: 4 }, { size: 'L', stock: 3 }, { size: 'XL', stock: 1 }, { size: 'XXL', stock: 0 }
        ]
    }
];

let products = JSON.parse(localStorage.getItem('vintage_products')) || defaultProducts;
if (!localStorage.getItem('vintage_products')) {
    localStorage.setItem('vintage_products', JSON.stringify(products));
}

let heroImages = JSON.parse(localStorage.getItem('vintage_hero_images')) || [
    'https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop'
];
if (!localStorage.getItem('vintage_hero_images')) {
    localStorage.setItem('vintage_hero_images', JSON.stringify(heroImages));
}

const saveData = () => {
    localStorage.setItem('vintage_products', JSON.stringify(products));
    localStorage.setItem('vintage_hero_images', JSON.stringify(heroImages));
};

const getProductById = (id) => products.find(p => p.id === id);
const getTrendingProducts = () => [...products].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 4);
const getNewArrivals = () => [...products].reverse().slice(0, 4);
