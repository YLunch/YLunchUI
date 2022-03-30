import {useQuery} from "react-query";
import React from "react";

type Props = {
    restaurantId:string
}

export default function Products ({restaurantId}:Props){
    const [products,setProducts]= React.useState<Product[]>();
    const query = useQuery("products", ()=>getProducts(restaurantId), {
        onSuccess: (response) => {
            setRestaurants(response);
        },
    });
    return <div>
        Products works
    </div>
}