import { ChangeEvent, useEffect, useState } from 'react';
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
	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);

			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name
				}
			});
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) setError(e.message);
			return;
		}
	};

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles.head}>
				<Headling>Меню</Headling>
				<Search
					placeholder="Введите блюдо или состав"
					onChange={updateFilter}
				/>
			</div>
			<div>
				{error && <div>{error}</div>}
				{!isLoading && products.length > 0 && (
					<MenuList products={products} />
				)}

				{isLoading && (
					<img
						className={styles.loading}
						src="/public/Load.gif"
						alt="loading"
					/>
				)}
				{!isLoading && products.length === 0 && (
					<div>Ничего не найдено</div>
				)}
			</div>
		</>
	);
}

export default Menu;
