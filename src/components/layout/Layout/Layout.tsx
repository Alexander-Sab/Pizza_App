import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import { Button } from '../../Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { getProfile, userActions } from '../../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((state: RootState) => state.user.profile);
	const items = useSelector((state: RootState) => state.cart.items);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};
	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.user}>
					<img
						className={styles.avatar}
						src="/avatar.png"
						alt="user"
					/>
					<div className={styles.name}>{profile?.name}</div>
					<div className={styles.email}>{profile?.email}</div>
				</div>
				<div className={styles.menu}>
					<NavLink
						to="/"
						className={({ isActive }) =>
							cn(styles.link, {
								[styles.active]: isActive
							})
						}
					>
						<img src="/menu-icon.svg" alt="menu" />
						Меню
					</NavLink>
					<NavLink
						to="/cart"
						className={({ isActive }) =>
							cn(styles.link, {
								[styles.active]: isActive
							})
						}
					>
						<img src="/cart-icon.svg" alt="cart" />
						Корзина{' '}
						<div className={styles.count}>
							{items.reduce(
								(acc, item) => (acc += item.count),
								0
							)}
						</div>
					</NavLink>
				</div>
				<Button className={styles.switch} onClick={logout}>
					<img src="/switch.svg" alt="switch" /> Выйти
				</Button>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}
