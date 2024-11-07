import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Menu } from './components/pages/Menu/Menu';
import { Cart } from './components/pages/Cart/Cart';
import { Error } from './components/Error/Error';

function App() {
	//const [counter, setCounter] = useState<number>(0);

	// const addCounter = (e: MouseEvent) => {};
	// console.log(e);
	//

	return (
		<>
			<Button> Кнопка </Button>
			<Button appearance="big"> Кнопка </Button>
			<Input placeholder="Email" />
		</>
	);
}

export default App;
