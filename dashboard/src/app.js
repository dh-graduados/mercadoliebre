import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

import env from "./.env.json";

const HOST = env.HOST;

export function App() {
    const [products, setProducts] = useState([]);

    async function updateProducts() {
        try {
            const response = await fetch(`${HOST}/api/products`);
            const result = await response.json();

            setProducts(result.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        updateProducts();
    }, []);

    return (
        <Container maxWidth="lg">
            <TableContainer component={Paper}>
                <Table aria-label="products table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Discount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((prod) => {
                            return (
                                <TableRow
                                    key={prod.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell>{prod.image}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {prod.name}
                                    </TableCell>
                                    <TableCell>{prod.price}</TableCell>
                                    <TableCell>{prod.discount}</TableCell>
                                </TableRow>
                            );
                        })}

                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4}> No se encontraron productos</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
