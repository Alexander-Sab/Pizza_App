import { useDispatch, useSelector } from 'react-redux';
import { Headling } from '../../Headling/Headling';
import { AppDispatch, RootState } from '../../../store/store';
import { Cartitem } from '../../Cartitem/Cartitem';
import { Product } from '../../interfaces/product.interfaces';
import { useEffect, useState } from 'react';
import { PREFIX } from '../../../helpers/API';
import axios from 'axios';
import styles from './Cart.module.css';
import { Button } from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../../store/cart.slice';

const DELIVERY_FEE = 169;

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((state: RootState) => state.cart.items);
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const total = items
		.map((i) => {
			const product = cartProducts.find((p) => p.id === i.id);
			if (!product) return 0;
			return i.count * (product.price ?? 0);
		})
		.reduce((acc, i) => (acc += i), 0);

	const getItems = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const products = await Promise.all(
			items.map((item) => getItems(item.id))
		);
		const productsWithCount = products.map((product, index) => ({
			...product,
			count: items[index].count
		}));
		setCartProducts(productsWithCount);
	};

	const checkout = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				products: items
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		);
		dispatch(cartActions.clean());
		navigate('/success');
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);
	return (
		<>
			<Headling className={styles.headling}>Корзина</Headling>
			{cartProducts.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) return null;
				return (
					<Cartitem
						key={i.id}
						{...product}
						price={product.price ?? 0}
						count={i.count}
					/>
				);
			})}
			<div className={styles.promocode}>Промокод</div>
			<div className={styles.design}>
				<div className={styles.designBlock}>
					<div className={styles.textDesign}>Итог</div>
					<div className={styles.total}>
						{total}&nbsp;<span>₽</span>
					</div>
				</div>
				<hr />
				<div className={styles.designBlock}>
					<div className={styles.textDesign}>Доставка</div>
					<div className={styles.total}>
						{DELIVERY_FEE} &nbsp;<span>₽</span>
					</div>
				</div>
				<hr />
				<div className={styles.designBlock}>
					<div className={styles.textDesign}>
						Итог&nbsp;
						<span className={styles.quantity}>
							({items.length})
						</span>
					</div>
					<div className={styles.total}>
						{total + DELIVERY_FEE}&nbsp;<span>₽</span>
					</div>
				</div>
				<div className={styles.checkout}>
					<Button appearance="big" onClick={checkout}>
						оформить
					</Button>
				</div>
			</div>
		</>
	);
}
