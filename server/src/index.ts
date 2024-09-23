import server from "./server";
const port = 5000;

server.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
