import http from 'k6/http';
import { sleep } from 'k6';
import { group } from 'k6';

export let options = {
    stages: [
        { duration: '15s', target: 5 },  // Ramp-up to 5 users over 15 seconds
        { duration: '15s', target: 10 }, // Ramp-up to 10 users over next 15 seconds
        { duration: '15s', target: 15 }, // Ramp-up to 15 users over next 15 seconds
        { duration: '15s', target: 20 }, // Ramp-up to 20 users over next 15 seconds
    ],
};

export default function () {
    // Browse categories
    group('Browse categories', function () {
        http.get('https://jpetstore.aspectran.com/catalog/');
        sleep(1);
    });
    // Categories for FISH
    group('Categories details', function () {
        http.get('https://jpetstore.aspectran.com/catalog/categories/FISH');
        sleep(1);
    });

    // Product details for FI-SW-01
    group('Product details', function () {
        http.get('https://jpetstore.aspectran.com/catalog/products/FI-SW-01');
        sleep(1);
    });

    // View cart
    group('View cart', function () {
        http.get('https://jpetstore.aspectran.com/cart/viewCart');
        sleep(1);
    });
}
