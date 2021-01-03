const http = require('http');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = `
interface Notification {
  id: ID!
  hasRead: Boolean!
}

type NotificationInvite implements Notification {
  id: ID!
  hasRead: Boolean!
  inviterId: String!
  storyId: String!
}

type NotificationFollow implements Notification {
  id: ID!
  hasRead: Boolean!
  followerId: String!
}

type Query {
  notifications(limit: Int!, offset: Int): [Notification!]!
}
`;

const notificationData = [{
	id: '1',
	hasRead: false,
	type: 'follow',
	followerId: '3'
}, {
	id: '2',
	hasRead: true,
	type: 'invite',
	inviterId: '4',
	storyId: '5'
},
{
	id: '3',
	hasRead: false,
	type: 'follow',
	followerId: '5'
},
{
	id: '4',
	hasRead: false,
	type: 'invite',
	inviterId: '5',
	storyId: '3'
}];

const resolvers = {
	Notification: {
		__resolveType(obj) {
			if (obj.type === 'follow') return 'NotificationFollow';
			else if (obj.type === 'invite') return 'NotificationInvite';
			return null;
		}
	},
	Query: {
		notifications(parent, { limit, offset = 0 }) {
			return notificationData.slice(offset, limit);
		}
	}
};

http.createServer((req,res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	graphqlHTTP({ schema: makeExecutableSchema({ typeDefs, resolvers }) })(req, res);
}).listen(9000);