export const userCols = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "country",
    headerName: "Country",
    width: 120,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 110,
  },
];

export const hotelCols = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "type", headerName: "Type", width: 120 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 110,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 120,
  },
];

export const roomCols = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "title", headerName: "Title", width: 100 },
  { field: "desc", headerName: "Description", width: 300 },
  { field: "price", headerName: "Price", type: Number, width: 120 },
  {
    field: "maxPeople",
    headerName: "Max People",
    type: Number,
    width: 150,
  },
];
