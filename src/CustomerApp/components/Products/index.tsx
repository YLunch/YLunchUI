import {useQuery} from "react-query";
import React from "react";
import {ProductReadDto} from "../../../models/Product";
import {getProducts} from "../../../services/api/product";

type Props = {
    restaurantId:string
}

export default function Products ({restaurantId}:Props){
    const [products,setProducts]= React.useState<ProductReadDto[]>([]);
    const query = useQuery("products", ()=>getProducts(restaurantId), {
        onSuccess: (response) => {
            console.log(response);
            setProducts(response);
        },
    });
    return <div>
        {products.map(product =>(
            <div key={product.id}>
                {product.name}
            </div>
        ))}
    </div>
}