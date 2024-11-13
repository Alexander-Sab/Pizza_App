import styles from './Headling.module.css';
import cn from 'classnames';
import { HeadingProps } from './Headling.props';

export function Headling({ children, className, ...props }: HeadingProps) {
	return (
		<h1 className={cn(styles.h1, className)} {...props}>
			{children}
		</h1>
	);
}
