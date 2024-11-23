import styles from './Cartitem.module.css';
import { CartItemProps } from './Cartitem.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export function Cartitem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();
	const increase = () => {
		dispatch(cartActions.add(props.id));
	};
	const descrease = () => {
		dispatch(cartActions.remove(props.id));
	};

	const remove = () => {
		dispatch(cartActions.delete(props.id));
	};

	return (
		<div className={styles.item}>
			<div
				className={styles.image}
				style={{ backgroundImage: `url(${props.image})` }}
			></div>
			<div className={styles.discription}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.currency}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles.actions}>
				<button
					className={`${styles.button} ${styles.minus}`}
					onClick={descrease}
				>
					<img src="/icon/minus.svg" alt="descrease" />
				</button>
				<div className={styles.count}>{props.count}</div>
				<button
					className={`${styles.button} ${styles.plus}`}
					onClick={increase}
				>
					<img src="/icon/plus.svg" alt="increase" />
				</button>
				<button
					className={`${styles.button} ${styles.crestic}`}
					onClick={remove}
				>
					<img src="/icon/crestic.svg" alt="delete" />
				</button>
			</div>
		</div>
	);
}
