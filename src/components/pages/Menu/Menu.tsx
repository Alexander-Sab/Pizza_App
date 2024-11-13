import { useEffect, useState } from 'react';
import { PREFIX } from '../../../helpers/API';
import { Search } from '../../../Search/Search';
import { Headling } from '../../Headling/Headling';
import { Product } from '../../interfaces/product.interfaces';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);

			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) setError(e.message);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);
	return (
		<>
			<div className={styles.head}>
				<Headling>Меню</Headling>
				<Search placeholder="Введите блюдо или состав" />
			</div>
			<div>
				{error && <div>{error}</div>}
				{!isLoading && <MenuList products={products} />}

				{isLoading && (
					<img
						className={styles.loading}
						src="/public/Load.gif"
						alt="loading"
					/>
				)}
			</div>
		</>
	);
}

export default Menu;
