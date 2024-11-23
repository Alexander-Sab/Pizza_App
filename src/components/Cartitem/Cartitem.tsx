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
	const descrease = () => {};

	const remove = () => {};

	return (
		<div className={styles.item}>
			<div className={styles.head}>
				<div
					className={styles.image}
					style={{ backgroundImage: `url(${props.image})` }}
				></div>
				<div className={styles.discription}>
					<div className={styles.name}>{props.name}</div>
					<div className={styles.currency}>{props.price}&nbsp;₽</div>
					<div className={styles.actions}>
						<button className={styles.button} onClick={descrease}>
							<img src="/cart-button-icon.svg" alt="descrease" />
						</button>
						<div>{props.count}</div>
						<button className={styles.button} onClick={increase}>
							<img src="/cart-button-icon.svg" alt="increase" />
						</button>
						<button className={styles.remove} onClick={remove}>
							<img src="/cart-button-icon.svg" alt="delete" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
