import { Search } from '../../../Search/Search';
import { Headling } from '../../Headling/Headling';
import styles from './Menu.module.css';

export function Menu() {
	return (
		<>
			<div className={styles.head}>
				<Headling>Меню</Headling>
				<Search placeholder="Введите блюдо или состав" />
			</div>
		</>
	);
}
