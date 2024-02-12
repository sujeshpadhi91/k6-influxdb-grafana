import http from 'k6/http';
import { sleep, group } from 'k6';

let groupResponseTimes = {};

export let options = {
    stages: [
        { duration: '10s', target: 5 },  // Ramp-up to 5 users over 10 seconds
        { duration: '10s', target: 10 }, // Ramp-up to 10 users over next 10 seconds
	{ duration: '5m', target: 10 },   // Stay at 10 users for 5 minutes
    ],
//    vus: 1,
//    duration: '300s',
};

export default function () {
    // Browse categories
    group('Browse categories', function () {
        let start = new Date();
        http.get('https://jpetstore.aspectran.com/catalog/');
        let end = new Date();
        let duration = end - start;
        groupResponseTimes['Browse categories'] = (groupResponseTimes['Browse categories'] || 0) + duration;
        sleep(1);
    });

    // Categories details
    group('Categories details', function () {
        let start = new Date();
        http.get('https://jpetstore.aspectran.com/catalog/categories/FISH');
        let end = new Date();
        let duration = end - start;
        groupResponseTimes['Categories details'] = (groupResponseTimes['Categories details'] || 0) + duration;
        sleep(1);
    });

    // Product details
    group('Product details', function () {
        let start = new Date();
        http.get('https://jpetstore.aspectran.com/catalog/products/FI-SW-01');
        let end = new Date();
        let duration = end - start;
        groupResponseTimes['Product details'] = (groupResponseTimes['Product details'] || 0) + duration;
        sleep(1);
    });

    // View cart
    group('View cart', function () {
        let start = new Date();
        http.get('https://jpetstore.aspectran.com/cart/viewCart');
        let end = new Date();
        let duration = end - start;
        groupResponseTimes['View cart'] = (groupResponseTimes['View cart'] || 0) + duration;
        sleep(1);
    });
}

export function handleSummary(data) {
    console.log("\nResponse times by group:");
    for (let groupName in groupResponseTimes) {
        console.log(`   ${groupName}: ${groupResponseTimes[groupName]} ms`);
    }
}
