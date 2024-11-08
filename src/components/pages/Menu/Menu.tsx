import { Search } from '../../../Search/Search';
import { Headling } from '../../Headling/Headling';
import { ProductCard } from '../../ProductCard/ProductCard';
import styles from './Menu.module.css';

export function Menu() {
	return (
		<>
			<div className={styles.head}>
				<Headling>Меню</Headling>
				<Search placeholder="Введите блюдо или состав" />
			</div>
			<div>
				<ProductCard
					id={1}
					title="Наслаждение"
					description="Салями, руккола, помидоры, оливки"
					image="/product-demo.png"
					price={300}
					rating={4.5}
				/>
			</div>
		</>
	);
}
