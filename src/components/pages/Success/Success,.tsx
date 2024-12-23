import { useNavigate } from 'react-router-dom';
import { Button } from '../../Button/Button';
import styles from './Success.module.css';
export function Success() {
	const navigate = useNavigate();
	return (
		<div className={styles.success}>
			<img src="/imagePizza.png" alt="pizza" />
			<div className={styles.text}>Ваш заказ успешно оформлен!</div>
			<Button appearance="big" onClick={() => navigate('/')}>
				Сделать новый
			</Button>
		</div>
	);
}
