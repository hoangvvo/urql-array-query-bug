import { createClient, Provider, useQuery, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { devtoolsExchange } from '@urql/devtools';
import './style';

const client = createClient({
	url: 'http://0.0.0.0:8080/graphql',
	exchanges: [devtoolsExchange, dedupExchange, cacheExchange({}), fetchExchange]
});

const query = `
query notifications {
	notifications {
		id
		hasRead
		storyId
		inviterId
	}
}
`;

const Notifications = () => {
	const [result, refetch] = useQuery({
		query,
		requestPolicy: 'cache-and-network'
	});

	const onClick = () => {
		console.log(client.readQuery(query));
	};

	return (<div>
		<ul style={{ whiteSpace: 'pre' }}>
			{result.data?.notifications?.map(notification => <li key={notification.id}>{JSON.stringify(notification, null, 4)}</li>)}
		</ul>
		<button onClick={onClick}>readQuery</button>
		<button onClick={() => refetch()}>refetch</button>
	</div>);
};

const App = () => (<Provider value={client}>
	<div>
		<h1>Hello, World!</h1>
		<Notifications />
	</div>
</Provider>);

export default App;