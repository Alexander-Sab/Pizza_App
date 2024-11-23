import styles from './ProductList.module.css';
import { ProductListProps } from './ProductList.props';
import { Headling } from '../../../Headling/Headling';
import { Button } from '../../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { cartActions } from '../../../../store/cart.slice';

export function ProductList({ data }: ProductListProps) {
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();
	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.add(data.id));
	};
	return (
		<>
			<div className={styles.head}>
				<button className={styles.back} onClick={() => navigate('/')}>
					<img src="/icon/leftArrow.svg" alt="left arrow" />
				</button>
				<Headling>{data.name}</Headling>
				<Button className={styles['add-to-cart']} onClick={add}>
					<img
						className={styles.icon}
						src="/icon/corzina_icon.svg"
						alt="cart icon"
					/>
					В корзину
				</Button>
			</div>
			<div className={styles.content}>
				<img src={data.image} alt={data.image} />

				<div className={styles.info}>
					<div className={styles.price}>
						Цена
						<div className={styles.priceValue}>
							{data.price}&nbsp;
							<span className={styles.currency}>₽</span>
						</div>
					</div>
					<hr className={styles.line} />
					<div className={styles.rating}>
						Рейтинг
						<div className={styles.ratingValue}>
							{data.rating}&nbsp;
							<img src="/icon/star_icon.svg" alt="star-icon" />
						</div>
					</div>
					<ul className={styles.ingredients}>
						<p className={styles.title}>Состав:</p>
						{data.ingredients.map((i) => (
							<li className={styles.ingredient} key={i}>
								{i}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
