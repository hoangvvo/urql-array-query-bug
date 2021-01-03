import { createClient, Provider, useQuery, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import './style';

const client = createClient({
	url: 'http://0.0.0.0:8080/graphql',
	exchanges: [dedupExchange, cacheExchange({}), fetchExchange]
});

const query = `
query notifications($limit: Int!, $offset: Int) {
	notifications(limit: $limit, offset: $offset) {
		id
		hasRead
		... on NotificationFollow {
			followerId
		}
		... on NotificationInvite {
			storyId
			inviterId
		}
	}
}
`;

const Notifications = () => {
	const [result] = useQuery({
		query,
		variables: { limit: 2 }
	});

	const onClick = () => {
		console.log(client.readQuery(query, { limit: 2 }));
	};

	return (<div>
		<ul style={{ whiteSpace: 'pre' }}>
			{result.data?.notifications?.map(notification => <li key={notification.id}>{JSON.stringify(notification, null, 4)}</li>)}
		</ul>
		<button onClick={onClick}>readQuery</button>
	</div>);
};

const App = () => (<Provider value={client}>
	<div>
		<h1>Hello, World!</h1>
		<Notifications />
	</div>
</Provider>);

export default App;