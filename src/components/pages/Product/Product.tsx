import { Await, useLoaderData } from 'react-router';
import type { Product } from '../../interfaces/product.interfaces';
import { Suspense } from 'react';

export function Product() {
	const data = useLoaderData() as { data: Product };
	return (
		<>
			<Suspense fallback={'Загружаю...'}>
				<Await resolve={data.data}>
					{({ data }: { data: Product }) => (
						<>Product - {data.name}</>
					)}
				</Await>
			</Suspense>
		</>
	);
}
