import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import fetch from "isomorphic-unfetch";
import {APOLLO_STATE, GRAPHQL_URI} from "../constants/root";
const initCache = (initialState?: any) => new InMemoryCache().restore(initialState || {});

const client = new ApolloClient({
	cache: initCache(typeof window !== "undefined" ? window[APOLLO_STATE] : undefined),
	ssrMode: true,
	link: new HttpLink({
		// @ts-ignore
		fetch,
		uri: GRAPHQL_URI
	})
});

export default client;
