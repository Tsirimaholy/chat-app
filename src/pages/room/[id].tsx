import React from 'react';
import {useRouter} from "next/router";

function SpecificRoom(props) {
    const router=useRouter();
    console.log(router.query["id"])
    return (
        <div>S Room {router.route}</div>
    );
}

export default SpecificRoom;