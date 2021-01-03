const http = require('http');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = `
type Notification {
  id: ID!
	hasRead: Boolean!
	inviterId: String
	storyId: String
	followerId: String
}

type Query {
  notifications: [Notification!]!
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
	Query: {
		notifications(parent) {
			return notificationData;
		}
	}
};

http.createServer((req,res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	graphqlHTTP({ schema: makeExecutableSchema({ typeDefs, resolvers }) })(req, res);
}).listen(9000);