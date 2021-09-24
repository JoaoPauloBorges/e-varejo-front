import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import ProductsList from 'pages/products/list';
import ProductsCreate from 'pages/products/create';
import Home from 'pages/home';
import NotFound from 'pages/notFound';
import Router from './router';

const Routes: FC = () => (
  <Switch>
    <Router
      exact={true}
      path="/"
      component={Home}
      titleHeader='Home'
    />
    <Router
      exact={true}
      path="/products"
      component={ProductsList}
      titleHeader='Listagem Produtos'
    />
    <Router
      exact={true}
      path="/create"
      component={ProductsCreate}
      titleHeader='Cadastro Produtos'
    />
    <Router
      path="*"
      exact={false}
      component={NotFound}
      titleHeader='Página não encontrada'
    />
  </Switch>
);

export default Routes;
