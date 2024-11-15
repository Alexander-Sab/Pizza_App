//import { FC } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

//  Альтернатива
// export const ButtonAlt: FC<ButtonProps> = ({
// 	children,
// 	className,
// 	...props
// }) => {
// 	return (
// 		<button
// 			className={cn(styles.button, styles.accent, className)}
// 			{...props}
// 		>
// 			{children}
// 		</button>
// 	);
// };

export function Button({
	children,
	className,
	appearance = 'small',
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(styles.button, styles.accent, className, {
				[styles['small']]: appearance === 'small',
				[styles['big']]: appearance === 'big'
			})}
			{...props}
		>
			{children}
		</button>
	);
}
