import { useSelector } from 'react-redux';
import { Headling } from '../../Headling/Headling';
import { RootState } from '../../../store/store';
import { Cartitem } from '../../Cartitem/Cartitem';
import { Product } from '../../interfaces/product.interfaces';
import { useEffect, useState } from 'react';
import { PREFIX } from '../../../helpers/API';
import axios from 'axios';

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((state: RootState) => state.cart.items);

	const getItems = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((item) => getItems(item.id)));
		setCartProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	}, [items, loadAllItems]);
	return (
		<>
			<Headling>Корзина</Headling>
			{cartProducts.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) return;
				return (
					<Cartitem
						{...product}
						price={product.price ?? 0}
						count={i.count}
					/>
				);
			})}
		</>
	);
}
