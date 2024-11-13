import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';

import { Cart } from './components/pages/Cart/Cart.tsx';
import { Error as ErrorPage } from './components/Error/Error.tsx';
import { Layout } from './components/layout/Layout/Layout.tsx';
import { Product } from './components/pages/Product/Product';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './components/layout/Auth/AuthLayout.tsx';
import { Login } from './components/pages/Login/Login.tsx';
import { Register } from './components/pages/Register/Register';
import { RequireAuth } from './helpers/RequireAuth.tsx';

const Menu = lazy(() => import('./components/pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<div>Загрузка...</div>}>
						<Menu />
					</Suspense>
				)
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios
									.get(`${PREFIX}/products/${params.id}`)
									.then((data) => resolve(data))
									.catch((e) => reject(e));
							}, 2000);
						})
					});
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
