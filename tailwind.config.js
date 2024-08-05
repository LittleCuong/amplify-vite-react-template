/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                primary: '#E74C3C',
            },
        },
    },
    plugins: [require('daisyui')],
};
