import * as React from "react";
import { useTranslation, i18n } from "../utils/i18n";
import { gql, useMutation, useQuery } from "@apollo/client";
import Table from "../components/table";
import { withSortOrder } from "../utils/table";
import Button  from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LanguageIcon from "@material-ui/icons/Language";

const GET_ITEMS = gql`
	query getItemsWithMeta($pagination: Pagination) {
		getItems(pagination: $pagination) {
			name
			id
			created
			updated
			description
			price
			stock
		}
		_getItemsMeta {
			count
		}
	}
`;

const CREATE_ITEM = gql`
	mutation createItem($input: ItemInput!) {
		createItem(input: $input) {
			name
			description
			price
			stock
		}
	}
`;
const Home = props => {
	const { t } = useTranslation("translation");
	// Queries
	const [newItemName, setNewItemName] = React.useState("");
	const [newItemPrice, setNewItemPrice] = React.useState("");
	const [newItemStock, setNewItemStock] = React.useState("");
	const [currentPage, setCurrentPage] = React.useState(0);
	const [currentPageSize, setCurrentPageSize] = React.useState(10);
	const [currentSortField, setCurrentSortField] = React.useState("name");
	const [currentSortOrder, setCurrentSortOrder] = React.useState("asc");
	const [currentPagination, setCurrentPagination] = React.useState({
		page: currentPage,
		pageSize: currentPageSize,
		sorting: {
			field: currentSortField,
			order: currentSortOrder
		}
	});
	React.useEffect(() => {
		if (
			currentPage !== undefined &&
			currentPageSize !== undefined &&
			currentSortField !== undefined &&
			currentSortOrder !== undefined
		) {
			const newPagination = {
				page: currentPage,
				pageSize: currentPageSize,
				sorting: {
					field: currentSortField,
					order: currentSortOrder
				}
			};
			setCurrentPagination(newPagination);
		} else {
			setCurrentPagination(undefined);
		}
	}, [currentPage, currentPageSize, currentSortField, currentSortOrder, setCurrentPagination]);

	const { loading, error, data } = useQuery(GET_ITEMS, {
		variables: {
			pagination: currentPagination
		}
	});
	// Mutations
	const [createItem, { data: newItemData, ...newItemProps }] = useMutation(CREATE_ITEM);
	// Effects
	React.useEffect(() => {
		if (newItemData && newItemData.createItem) {
			newItemProps.client.reFetchObservableQueries();
		}
	}, [newItemData, newItemProps]);

	const mappedData = React.useMemo(() => {
		if (data) {
			return data.getItems.map(({ __typename, ...item }) => item);
		}
		return [];
	}, [data]);
	const fields = ["id", "name", "price", "stock", "created", "updated", "description"];
	const columns = [
		{ title: t("id"), field: "id" },
		{ title: t("name"), field: "name" },
		{ title: t("price"), field: "price" },
		{ title: t("stock"), field: "stock" },
		{ title: t("created"), field: "created" },
		{ title: t("updated"), field: "updated" },
		{ title: t("description"), field: "description" }
	];
	const sortedColumns = React.useMemo(
		() =>
			withSortOrder(columns, {
				sortField: currentSortField,
				sortOrder: currentSortOrder
			}),
		[currentSortField, currentSortOrder, columns]
	);
	return (
		<div>
			<Button
				startIcon={<LanguageIcon />}
				onClick={() => i18n.changeLanguage(i18n.language === "en" ? "de" : "en")}>
				{t(i18n.language === "en" ? "de" : "en")}
			</Button>
			<div>
				<TextField value={newItemName} label={t("name")} onChange={(e) => {
					setNewItemName(e.target.value)
				}}/><br/>
				<TextField type="number" label={t("price")} value={newItemPrice} onChange={(e) => {
					setNewItemPrice(e.target.value)
				}}/><br/>
				<TextField type="number" label={t("stock")} value={newItemStock} onChange={(e) => {
					setNewItemStock(e.target.value)
				}}/><br/>
				<Button
					disabled={!newItemName}
					onClick={async () => {
						await createItem({
							variables: {
								input: {
									name: newItemName,
									price: parseFloat(newItemPrice),
									stock: parseInt(newItemStock)
								}
							}
						});
						setNewItemName("");
						setNewItemPrice("");
						setNewItemStock("");
					}}
				>
					{t("addItem")}
				</Button>
			</div>
			<Table
				options={{
					pageSize: currentPageSize
				}}
				columns={sortedColumns}
				isLoading={loading}
				totalCount={data ? data._getItemsMeta.count : undefined}
				page={currentPage}
				onChangePage={nextPage => {
					setCurrentPage(nextPage);
				}}
				onChangeRowsPerPage={nextPerPage => {
					setCurrentPageSize(nextPerPage);
					setCurrentPage(0);
				}}
				onOrderChange={(newSortFieldIndex, newSortOrder) => {
					const newSortField = fields[newSortFieldIndex];
					setCurrentSortField(newSortField || undefined);
					setCurrentSortOrder(newSortOrder || undefined);
				}}
				data={mappedData}
			/>
		</div>
	);
};

Home.getInitialProps = async () => ({
	namespacesRequired: ["translation"]
});

export default Home;
