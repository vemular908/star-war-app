import React from 'react';

const Home = React.lazy(() => import('./views/pages/Home'));
const Login = React.lazy(() => import('./views/pages/Login'));




const routes = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/login', exact: true, name: 'Login', component: Login },
];

export default routes;
